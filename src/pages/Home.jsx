import { getUpcomingMovies } from "../services/Api";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeProvider";

const Home = () => {
  const { darkMode } = useContext(DarkModeContext);

  const fetchMovies = ({ pageParam = 1 }) => getUpcomingMovies(pageParam);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["upcomingMovies"], fetchMovies, {
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.page + 1;
      return nextPage < lastPage.total_pages ? nextPage : undefined;
    },
  });
  //console.log(data);
  const movies = data?.pages.flatMap((page) => page.results) ?? [];
  return status === "loading" ? (
    <div className="text-center">
      <Spinner />
    </div>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className={`main ${darkMode ? "dark-body" : ""} transition duration-500 ease-in-out`}>
    <div className="container mx-auto px-12 py-4">
      <InfiniteScroll
        dataLength={movies.length} //This is important field to render the next data
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
        <div className="container-cards rounded grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6 gap-2 overflow-hidden">
          {movies.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div></div>
  );
};

export default Home;
