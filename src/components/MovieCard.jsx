import { Link } from "react-router-dom";
import defaultImage from "../assets/images/imagenf.svg";

const MovieCard = ({ movie }) => {
  const urlPoster = "https://image.tmdb.org/t/p/w300";
  const { id, poster_path, title } = movie;
  const handleError = (event) => {
    event.target.src = defaultImage;
  };
  return (
    <div className="group m-auto relative">
      <Link to={`/detail/${id}`}>
        <img
        className="rounded-md w-full max-w-[300px] sm:max-w-full"
          src={`${urlPoster}${poster_path}`}
          alt={title}
          onError={handleError}
        />
        <div className="overlay absolute px-1 bottom-0 left-0 right-0 bg-black/75 h-0 group-hover:h-1/4 transition-all duration-300 ease-in-out grid items-center overflow-hidden">
          <h2 className="font-semibold text-center text-white transform">{title}</h2>
          {/* <p className="text-white/60">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p> */}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
