import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRecomMovies } from "../services/Api";
import MovieCard from "../components/MovieCard";

const RecomMovies = ({ idMovie }) => {

  //FETCH DATA
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
      {listRecom?.results.length>0 ? (
        listRecom?.results
          .sort((a, b) => b.popularity - a.popularity)
          .map((elem, i) => <MovieCard key={i} movie={elem} />)
      ) : (
        <div className="col-span-6
        
        ">
          <h1 className="font-semibold text-center mb-4">
            Ups...! No se encontraron películas recomendadas.
          </h1>
        </div>
      )}
    </>
  );
};

export default RecomMovies;
