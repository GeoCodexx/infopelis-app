import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchedMovies } from "../services/Api";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import noResultImage from "../assets/images/no-results.png";
import Spinner from "../components/Spinner";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeProvider";

const Search = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { word } = useParams();

  const fetchMovies = ({ pageParam = 1 }) => getSearchedMovies(pageParam, word);

  //Esto asegura que la consulta se refresque cuando "word" cambie. En este caso, se utilizó ["searchedmovies", word] como clave.
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["searchedmovies", word], fetchMovies, {
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.page + 1;
      return nextPage < lastPage.total_pages ? nextPage : undefined;
    },
  });

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  /*useEffect(() => {
    fetchNextPage(1); // Fetch the first page when "word" changes
  }, [word]);*/

  return status === "loading" ? (
    <div style={{ textAlign: "center" }}>
      <Spinner />
    </div>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div
      className={`main ${
        darkMode ? "dark-body" : ""
      } transition duration-500 ease-in-out`}
    >
      <div className="container mx-auto px-4 py-4">
        {movies.length > 0 ? (
          <InfiniteScroll
            dataLength={movies.length}
            next={() => {
              fetchNextPage();
            }}
            hasMore={hasNextPage}
            loader={
              <div style={{ textAlign: "center" }}>
                <Spinner />
              </div>
            }
          >
            <div className="container-cards mb-6 rounded grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6 gap-2 overflow-hidden">
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
    </div>
  );
};

export default Search;
