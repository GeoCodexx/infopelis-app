import { useInfiniteQuery } from "@tanstack/react-query";
import { getMoviesByRating } from "../services/Api";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext } from "react";
import Contexto from "../context/Context";
import noResultImage from "../assets/images/no-results.png";
import Spinner from "../components/Spinner";
import { DarkModeContext } from "../context/DarkModeProvider";

const FilterByRating = () => {

  const { darkMode } = useContext(DarkModeContext);
    const { rangeRating } = useContext(Contexto);
    const fetchMovies = ({ pageParam = 1 }) => getMoviesByRating(pageParam, rangeRating);
  
    //Esto asegura que la consulta se refresque cuando "word" cambie. En este caso, se utilizó ["moviesByRating", word] como clave.
    const {
      data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      status,
    } = useInfiniteQuery(["moviesByRating", rangeRating], fetchMovies, {
      getNextPageParam: (lastPage, pages) => {
        const nextPage = lastPage.page + 1;
        return nextPage < lastPage.total_pages ? nextPage : undefined;
      },
    });
  
    const movies = data?.pages.flatMap((page) => page.results) ?? [];
  
    return status === "loading" ? (
      <div className="text-center">
      <Spinner />
    </div>
    ) : status === "error" ? (
      <p>Error: {error.message}</p>
    ) : (
      <div className={`container mx-auto px-4 py-4 ${darkMode ? "dark-body" : ""}`}>
        {movies.length > 0 ? (
          <InfiniteScroll
            dataLength={movies.length}
            next={() => {
              fetchNextPage();
            }}
            hasMore={hasNextPage}
            loader={<div className="text-center">
            <Spinner />
          </div>}
          >
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6 gap-1 overflow-hidden">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <>
            <div className="bg-red-200 rounded-md p-4 mt-5 text-center ">
              <p className="text-base">
                Ups...! No se encontraron resultados de su busqueda.
              </p>
            </div>
            <img
              className="mt-6 w-3/4 sm:w-2/4 lg:w-1/4 mx-auto"
              src={noResultImage}
              alt="no-result-image"
            />
          </>
        )}
      </div>
    );
}

export default FilterByRating