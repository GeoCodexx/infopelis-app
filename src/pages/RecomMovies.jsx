import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRecomMovies } from "../services/Api";
import MovieCard from "../components/MovieCard";

const RecomMovies = ({ idMovie }) => {
  //console.log(idMovie);
  const urlPoster = "https://image.tmdb.org/t/p/w300";

  const {
    data: listRecom,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recommended-movies"],
    queryFn: () => getRecomMovies(1, idMovie),
  });

  if (isLoading) console.log("Cargando Videos Recomendados...");
  else if (isError) console.error(error.message);
  //console.log(listRecom.results);
  return (
    <>
      {listRecom?.results>0 ? (
        listRecom?.results
          .sort((a, b) => b.popularity - a.popularity)
          .map((elem, i) => <MovieCard key={i} movie={elem} />)
      ) : (
        <div>
          <h1 className="font-semibold text-center col-span-2 text-red-400">
            Ups...! No se encontraron películas recomendadas.
          </h1>
        </div>
      )}
    </>
  );
};

export default RecomMovies;
