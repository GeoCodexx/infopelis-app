import { useInfiniteQuery } from "@tanstack/react-query";
import { getPremiereMovies } from "../services/Api";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";

const FilterByGenre = () => {
  const fetchMovies = ({ pageParam = 1 }) => getPremiereMovies(pageParam);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["moviesByGenre"], fetchMovies, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page === lastPage.total_pages) return false;
      return lastPage.page + 1;
    },
  });
  const movies = data?.pages.flatMap((page) => page.results) ?? [];
  const filtered = movies.filter((p) => {
    [28, 12, 16, 35].forEach((element) => {
      p.genre_ids.includes(element);
    });
  });
  console.log(filtered);
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

export default FilterByGenre;
