import { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import { getGenres } from "../services/Api";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Rating } from "@smastrom/react-rating";
import { useContext } from "react";
import Contexto from "../context/Context";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeProvider";

const Filter = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  //Para realizar las animaciones del Select (Libreria react-select)
  const animatedComponents = makeAnimated();

  //opciones por defecto para el select
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const { darkMode } = useContext(DarkModeContext);
  const { isCollapFilter } = useContext(Contexto);

  const naveg = useNavigate();
  const selectInputRef = useRef();

  const { setGenres } = useContext(Contexto);
  const { setRangeAnio } = useContext(Contexto);
  const { setRangeRating } = useContext(Contexto);

  const [startYear, setStartYear] = useState(currentYear - 1);
  const [endYear, setEndYear] = useState(currentYear);
  const [rating, setRating] = useState(0);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  //if (isLoading) console.log("Loading...");
  if (isError) console.error(error.message);

  const optionsGenre = data?.genres.map((elemento) => {
    return { value: `${elemento.id}`, label: `${elemento.name}` };
  });

  //FILTER BY GENRES;
  const handleOnChangeSelect = (data) => {
    const genresMovies = data && data.map((elem) => elem.value);
    //console.log(genresMovies.toString());
    if (data.length > 0) {
      setGenres(genresMovies.toString());
      setStartYear(currentYear - 1);
      setEndYear(currentYear);
      setRating(0);
      naveg("/filterbygenres");
    }
  };

  //FILTER BY YEAR RANGE
  const handleOnChangeYear = () => {
    //console.log(startYear, endYear);
    setRangeAnio([startYear.toString(), endYear.toString()]);
    selectInputRef.current.clearValue();
    setRating(0);
    naveg("/filterbyyear");
  };

  //FILTER BY RATING
  useEffect(() => {
    // Función de búsqueda que se ejecuta después del debounce
    const filter = () => {
      //realizar la lógica de búsqueda o llamar a una función de búsqueda
      //console.log("Realizando búsqueda:", rating);
      const newValueRating = rating * 2;
      setRangeRating([
        newValueRating - 2,
        newValueRating === 10 ? newValueRating : newValueRating - 0.1,
      ]);
    };

    // Aplicar el efecto de debounce utilizando setTimeout
    const delayDebounceFn = setTimeout(() => {
      if (rating) {
        filter();
        setStartYear(currentYear - 1);
        setEndYear(currentYear);
        selectInputRef.current.clearValue();
        naveg("/filterbyrating");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [rating]);

  return (
    <div
      className={`main ${
        darkMode ? "dark-body" : ""
      } transition duration-500 ease-in-out`}
    >
      <div
        className={`container mx-auto pt-[54px] px-1 sm:px-4 py-2 sm:flex sm:flex-wrap lg:flex-nowrap items-center text-sm sm:text-base sm:justify-between shadow-md z-10 ${
          isCollapFilter ? "hidden" : "block"
        }`}
      >
        <div className="flex items-center text-base mb-1 sm:mb-0 pt-3">
          <FaFilter className="mr-1" />
          <span className="font-semibold">Filtros:</span>
        </div>
        <div className="w-full px-7 sm:px-3 py-1 items-center sm:flex sm:justify-evenly">
          <div className="mb-3 sm:mb-0 sm:w-48 lg:w-1/4 sm:flex sm:flex-col items-center">
            <p className="font-medium sm:mb-2">Género</p>
            <div className="w-full">
              <Select
                ref={selectInputRef}
                styles={{
                  menuList: (styles) => ({
                    ...styles,
                    background: darkMode && "#212121",
                    cursor: "pointer",
                  }),
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: darkMode && "none",
                    backgroundColor: darkMode && "#242b33",
                    cursor: "pointer",
                  }),
                }}
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={optionsGenre ? optionsGenre : options}
                placeholder="Seleccione..."
                isMulti
                theme={(theme) => ({
                  ...theme,
                  //borderRadius: 2,
                  colors: {
                    ...theme.colors,
                    primary25: darkMode ? "#2B3039" : "#EEEEEE",
                    neutral10: darkMode? "#424242":"hsl(0, 0%, 90%)",
                    neutral80: darkMode? "#cccccc":"hsl(0, 0%, 20%)",
                    dangerLight: darkMode? "#212121":"#FFBDAD",
                    primary50: "#E0E0E0",
                    primary: "grey",
                  },
                })}
                onChange={handleOnChangeSelect}
              />
            </div>
          </div>

          <div className="mb-3 sm:mb-0 sm:w-48 lg:w-1/4 sm:flex sm:flex-col items-center sm:ml-9 md:ml-0">
            <p className="font-medium sm:mb-2">Año</p>
            <div className="md:w-4/5 flex justify-start sm:justify-center items-center">
              <div className="flex">
                <input
                  className={`${
                    darkMode
                      ? "bg-[#242b33]"
                      : "bg-zinc-100 border border-gray-300"
                  } focus:outline-none rounded-md text-center py-1 cursor-pointer`}
                  type="number"
                  min="1900"
                  max={currentYear}
                  step="1"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  onFocus={(event) => event.target.select()}
                />

                <span className="text-semibold mx-1">-</span>

                <input
                  className={`${
                    darkMode
                      ? "bg-[#242b33]"
                      : "bg-zinc-100 border border-gray-300"
                  } focus:outline-none rounded-md text-center py-1 cursor-pointer`}
                  type="number"
                  min="1900"
                  max={currentYear}
                  step="1"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  onFocus={(event) => event.target.select()}
                />
              </div>
              <div className="ml-1 overflow-hidden">
                {darkMode ? (
                  <button
                    className="rounded-md py-1 px-4 bg-[#545454] hover:bg-[#3a3d32] text-[#CCCCCC] transition"
                    onClick={handleOnChangeYear}
                  >
                    Ir
                  </button>
                ) : (
                  <button
                    className="rounded-md shadow-md border border-gray-300 py-1 px-4 bg-gray-400 hover:bg-slate-600 text-white transition duration-300 ease-in-out"
                    onClick={handleOnChangeYear}
                  >
                    Ir
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="sm:flex sm:flex-col items-center sm:ml-9 md:ml-0">
            <p className="font-medium sm:mb-2">Rating</p>
            <div style={{ maxWidth: 140, width: "100%" }}>
              <div className="w-full mt-1">
                <Rating value={rating} onChange={setRating} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
