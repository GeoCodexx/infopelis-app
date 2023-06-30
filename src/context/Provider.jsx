import { useReducer } from "react";
import Contexto from "./Context";
import { getPremiereMovies } from "../services/Api";
import { useState } from "react";

const ProviderFilter = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [rangeAnio, setRangeAnio] = useState(0);
  return (
    <Contexto.Provider value={{ genres, setGenres, rangeAnio, setRangeAnio }}>
      {children}
    </Contexto.Provider>
  );
};

export default ProviderFilter;
