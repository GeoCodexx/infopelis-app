import React from "react";
import { getMovieCredits } from "../services/Api";
import { useQuery } from "@tanstack/react-query";
import noImage from "../assets/images/no-photo-profile.png";

const CastMovie = ({ idmovie }) => {
  const urlPoster = "https://image.tmdb.org/t/p/w138_and_h175_face";
  //const urlPoster = "https://image.tmdb.org/t/p/original";

  const {
    data: items,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["credits-movie"],
    queryFn: () => getMovieCredits(idmovie),
  });

  if (isLoading) console.log("Cargando Creditos");
  else if (isError) console.error(error.message);
  //console.log(items);
  return (
    <>
      {items?.cast &&
        items?.cast.map((c, i) => (
          <div
            className="card my-1 mx-2 min-w-[138px] max-w-[138px] rounded-md text-center bg-white overflow-hidden shadow-md border border-gray-200"
            key={i}
          >
            <img
              className="rounded-t-md"
              src={`${urlPoster}${c.profile_path}`}
              alt={c.name}
              onError={(e) => (e.target.src = noImage)}
            />
            <p className="font-semibold">{c.name}</p>
            <p className="px-2">{c.character}</p>
          </div>
        ))}
    </>
  );
};

export default CastMovie;
