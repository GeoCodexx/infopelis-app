import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchedMovies } from "../services/Api";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

const Search = () => {
  const { word } = useParams();

  const fetchMovies = ({ pageParam = 1 }) =>
    getSearchedMovies(pageParam, word);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["searchedmovies"], fetchMovies, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page === lastPage.total_pages) return false;
      return lastPage.page + 1;
    },
  });
  const movies = data?.pages.flatMap((page) => page.results) ?? [];
  return status === "loading" ? (
    <p>Loading...</p>
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
        loader={<h4>Loading...</h4>}
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6 gap-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Search;