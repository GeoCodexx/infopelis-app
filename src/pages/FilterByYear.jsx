import { getMoviesByYear } from "../services/Api";
import Contexto from "../context/Context";
import { useInfiniteQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext } from "react";
import noResultImage from "../assets/images/no-results.png";
import Spinner from "../components/Spinner";
import { DarkModeContext } from "../context/DarkModeProvider";

const FilterByYear = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { rangeAnio } = useContext(Contexto);

  const fetchMovies = ({ pageParam = 1 }) =>
    getMoviesByYear(pageParam, rangeAnio);

  //Esto asegura que la consulta se refresque cuando "word" cambie. En este caso, se utilizó ["searchedmovies", word] como clave.
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["moviesByYear", rangeAnio], fetchMovies, {
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
    <div className="text-center">
      <Spinner />
    </div>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div
      className={`main ${
        darkMode ? "dark-body" : ""
      } transition ease-in-out`}
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
              <div className="text-center">
                <Spinner />
              </div>
            }
          >
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6 gap-2 overflow-hidden">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div className={darkMode ? "dark-body h-screen" : "main"}>
            <div className="mt-10 p-4 sm:mt-5 text-center ">
              <p className="sm:text-lg font-semibold">
                Ups...! No se encontraron resultados de su busqueda.
              </p>
              <img
                className="mt-6 w-3/4 sm:w-2/4 lg:w-1/4 mx-auto"
                src={noResultImage}
                alt="no-result-image"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterByYear;
