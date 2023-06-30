import { Link } from "react-router-dom";
import defaultImage from "../assets/images/default-image.jpg";

const MovieCard = ({ movie }) => {
  const urlPoster = "https://image.tmdb.org/t/p/w300";
  const { id, poster_path, title } = movie;
  const handleError = (event) => {
    event.target.src = defaultImage;
  };
  return (
    <div className="m-auto">
      <Link to={`/detail/${id}`}>
        <img
          src={`${urlPoster}${poster_path}`}
          alt={title}
          onError={handleError}
        />
      </Link>
    </div>
  );
};

export default MovieCard;
