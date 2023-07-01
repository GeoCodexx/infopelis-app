import { useInfiniteQuery } from "@tanstack/react-query";
import { getPremiereMovies } from "../services/Api";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";

const Premiere = () => {
  const fetchMovies = ({ pageParam = 1 }) => getPremiereMovies(pageParam);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["projects"], fetchMovies, {
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
    <div className="container mx-auto px-4 py-4">
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6 gap-1 overflow-hidden">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Premiere;
