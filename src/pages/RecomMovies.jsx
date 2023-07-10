import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRecomMovies } from "../services/Api";

const RecomMovies = ({ idMovie }) => {
  //console.log(idMovie);
  const { data:listRecom, isLoading, isError, error } = useQuery({
    queryKey: ["recommended-movies"],
    queryFn: getRecomMovies(1, idMovie),
  });

  if (isLoading) console.log("Loading...");
  else if (isError) console.error(error.message);
  console.log(listRecom);
  return (
    <>
      {listRecom && listRecom.map((elem,i) => (
        <div>
          <img src="" alt="hola" />
          <p>{i}</p>
        </div>
      ))}
    </>
  );
};

export default RecomMovies;
