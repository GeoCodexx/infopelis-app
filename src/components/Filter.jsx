import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { getGenres } from "../services/Api";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactSlider from "react-slider";
import { Rating } from "@smastrom/react-rating";

/*const getRating = (rating) => {
  switch (rating) {
    case 1:
      return "Poor";
    case 2:
      return "Nothing special";
    case 3:
      return "Average";
    case 4:
      return "Very good";
    case 5:
      return "Excellent";
    default:
      return "None";
  }
};*/

const Filter = () => {
  const animatedComponents = makeAnimated();
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  //const [itemsSelected, setItemsSelected] = useState([]);
  const [valueSlider, setValueSlider] = useState([1900, 2023]);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  const optionsGenre = data.genres.map((elemento) => {
    return { value: `${elemento.id}`, label: `${elemento.name}` };
  });

  //console.log(itemsSelected);

  return (
    <div className="container mx-auto px-1 sm:px-4 py-2 sm:flex items-center text-sm sm:text-base sm:justify-between shadow-md">
      <div className="flex items-center text-base mb-2 sm:mb-0">
        <FaFilter className="mr-1" />
        <span>Filtros:</span>
      </div>
      <div className="w-full px-7 sm:px-3 py-1 items-center sm:flex sm:justify-evenly">
        <div className="mb-4 sm:mb-0 sm:w-48 lg:w-1/4 sm:flex sm:flex-col items-center">
          <p className="font-semibold">Género</p>
          <div className="w-full">
            <Select
              closeMenuOnSelect={false}
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
              onChange={(data) => setItemsSelected(data)}
            />
          </div>
        </div>
        <div className="mb-4 sm:mb-0 sm:w-48 lg:w-1/4 sm:flex sm:flex-col items-center">
          <p className="font-semibold">Año</p>
          <p className="flex justify-between w-4/5">
            <span className="text-sm">{valueSlider[0]}</span>
            <span className="text-sm">{valueSlider[1]}</span>
          </p>
          <div className="w-4/5">
            <ReactSlider
              className="slider"
              onChange={setValueSlider}
              value={valueSlider}
              min={1900}
              max={2023}
            />
          </div>
        </div>
        <div className="sm:w-48 sm:flex sm:flex-col items-center">
          <p className="font-semibold">Rating</p>
          <div style={{ maxWidth: 140, width: "100%" }}>
            <div className="w-full mt-2">
              <Rating
                value={rating}
                onChange={setRating}
                onHoverChange={setHoveredRating}
              />
              {/* <div>
                <div>{`Selected: ${getRating(rating)}`}</div>
                <div>{getRating(hoveredRating)}</div>
              </div> */}
            </div>
            {/* <button className="py-1 px-2 rounded-md shadow-md " type="button" onClick={() => setRating(0)}>
              reset
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
