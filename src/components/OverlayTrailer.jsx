import { useQuery } from "@tanstack/react-query";
import "./OverlayTrailer.css"; // Importa los estilos del overlay
import { getMovieVideos } from "../services/Api";
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

  if (isLoading) return <div className="text-center">Cargando...</div>;
  else if (error) return <div>Error: {error.message}</div>;

  const trailer = videos?.results.find((v) => v.type === "Trailer"); //`https://www.youtube.com/embed/${videoId}`;
  const videoUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}`
    : null;

  return (
    <div className="video-overlay">
      <div className="video-overlay-content w-[426px] h-[240px] sm:w-[640px] sm:h-[360px] md:w-[854px] md:h-[480px] relative">
        {videoUrl !== null ? (
          <iframe
            title="YouTube Video"
            src={videoUrl}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <h1 className="text-white text-lg font-semibold">
            NO SE ENCONTRÓ EL VIDEO TRAILER.
          </h1>
        )}

        <button className="hover:bg-slate-700 transition-colors" onClick={onClose}>
          {/* <MdClose className="mt-1"/> */}
          <span>Cerrar</span>
        </button>
      </div>
    </div>
  );
};

export default OverlayTrailer;
