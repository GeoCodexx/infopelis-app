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
      {listRecom?.results &&
        listRecom?.results.sort((a, b) => b.popularity - a.popularity).map((elem, i) => (
          <MovieCard key={i} movie={elem}/>
          
        ))}
        {/*<div key={i} className="m-auto">
            <img src={`${urlPoster}${elem.poster_path}`} alt={elem.title} />
        </div>*/}
    </>
  );
};

export default RecomMovies;
