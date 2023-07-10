import Contexto from "./Context";

import { useState } from "react";

const ProviderFilter = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [rangeAnio, setRangeAnio] = useState([]);
  const [rangeRating, setRangeRating] = useState([]);

  return (
    <Contexto.Provider
      value={{
        genres,
        setGenres,
        rangeAnio,
        setRangeAnio,
        rangeRating,
        setRangeRating,
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export default ProviderFilter;
