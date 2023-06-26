import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const urlPoster = "https://image.tmdb.org/t/p/w300";
  const { id, poster_path, title } = movie;
  return (
    <div className="m-auto">
      <Link to={`/detail/${id}`}>
        <img src={`${urlPoster}${poster_path}`} alt={title} />
      </Link>
    </div>
  );
};

export default MovieCard;
