import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { getGenres } from "../services/Api";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Rating } from "@smastrom/react-rating";
import { useContext } from "react";
import Contexto from "../context/Context";
import { useNavigate } from "react-router-dom";
import { MdCleaningServices } from "react-icons/md";
import { useRef } from "react";

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

  if (isLoading) console.log("Loading...");
  else if (isError) console.error(error.message);

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
    <div className="container mx-auto px-1 sm:px-4 py-2 sm:flex sm:flex-wrap lg:flex-nowrap items-center text-sm sm:text-base sm:justify-between shadow-md">
      <div className="flex items-center text-base mb-2 sm:mb-0">
        <FaFilter className="mr-1" />
        <span>Filtros:</span>
      </div>
      <div className="w-full px-7 sm:px-3 py-1 items-center sm:flex sm:justify-evenly">
        <div className="mb-3 sm:mb-0 sm:w-48 lg:w-1/4 sm:flex sm:flex-col items-center">
          <p className="font-medium">Género</p>
          <div className="w-full">
            <Select
              ref={selectInputRef}
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
                  primary25: "#EEEEEE",
                  primary50: "#DCDEDC",
                  primary: "grey",
                },
              })}
              onChange={handleOnChangeSelect}
            />
          </div>
        </div>

        <div className="mb-3 sm:mb-0 sm:w-48 lg:w-1/4 sm:flex sm:flex-col items-center sm:ml-9 md:ml-0">
          <p className="font-medium">Año</p>
          <div className="md:w-4/5 flex justify-start sm:justify-center items-center">
            <div className="flex">
              <input
                className="bg-zinc-100 focus:outline-none rounded-md text-center py-1 cursor-pointer border border-gray-300"
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
                className="bg-zinc-100 focus:outline-none rounded-md text-center py-1 cursor-pointer border border-gray-300"
                type="number"
                min="1900"
                max={currentYear}
                step="1"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                onFocus={(event) => event.target.select()}
              />
            </div>
            <div className="ml-1">
              <button
                className="rounded-md shadow-md border border-gray-300 py-1 px-3 bg-slate-500 hover:bg-slate-600 text-white"
                onClick={handleOnChangeYear}
              >
                Ir
              </button>
            </div>
          </div>
        </div>

        <div className="sm:flex sm:flex-col items-center sm:ml-9 md:ml-0">
          <p className="font-medium">Rating</p>
          <div style={{ maxWidth: 140, width: "100%" }}>
            <div className="w-full mt-2">
              <Rating value={rating} onChange={setRating} />
            </div>
          </div>
        </div>
        <div className="button-reset">
          <button
            className="p-2 rounded-md shadow bg-slate-500 hover:bg-slate-700 text-white  mt-3 sm:mt-0 sm:hidden md:hidden lg:inline-block"
            title="Limpiar filtros de búsqueda"
          >
            <MdCleaningServices className="inline-block" />
            <span className="align-middle"> Limpiar</span>
          </button>
          <button
            className="p-2 sm:mt-5 md:mt-5 sm:ml-2 rounded-md shadow bg-slate-500 hover:bg-slate-700 text-white  mt-3 lg:hidden hidden sm:inline-block"
            title="Limpiar filtros de búsqueda"
          >
            <MdCleaningServices className="inline-block" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
