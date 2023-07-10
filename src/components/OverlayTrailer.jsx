import { useQuery } from "@tanstack/react-query";
import "./OverlayTrailer.css"; // Importa los estilos del overlay
import { getMovieVideos } from "../services/Api";
import { MdClose } from "react-icons/md";
const OverlayTrailer = ({ movieId, onClose }) => {
  const {
    isLoading,
    data: videos,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie-videos", movieId],
    queryFn: () => getMovieVideos(movieId),
  });

  if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>Error: {error.message}</div>;

  const trailer = videos?.results.find((v) => v.type === "Trailer"); //`https://www.youtube.com/embed/${videoId}`;
  const videoUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}`
    : null;

  return (
    <div className="video-overlay">
      <div className="video-overlay-content w-[426px] h-[240px] sm:w-[640px] sm:h-[360px] md:w-[854px] md:h-[480px] xl:w-[1280px] xl:h-[720px]">
        {videoUrl !== null ? (
          <iframe
            title="YouTube Video"
            src={videoUrl}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <h1 className="text-white text-lg font-semibold">
            NO SE ENCONTRO TRAILER PARA ESTA PELICULA
          </h1>
        )}
        <button
          className="bg-gray-700 hover:bg-gray-400 font-bold py-2 px-4 rounded inline-flex items-center text-white"
          onClick={onClose}
        >
          <MdClose />
          <span>Cerrar</span>
        </button>
      </div>
    </div>
  );
};

export default OverlayTrailer;
