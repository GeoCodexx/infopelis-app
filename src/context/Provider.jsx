import Contexto from "./Context";

import { useState } from "react";

const ProviderFilter = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [rangeAnio, setRangeAnio] = useState([]);
  const [rangeRating, setRangeRating] = useState([]);
  const [isCollapFilter, setIsCollapFilter] = useState(true);

  return (
    <Contexto.Provider
      value={{
        genres,
        setGenres,
        rangeAnio,
        setRangeAnio,
        rangeRating,
        setRangeRating,
        isCollapFilter,
        setIsCollapFilter
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export default ProviderFilter;
