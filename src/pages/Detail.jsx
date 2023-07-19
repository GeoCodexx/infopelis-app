import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../services/Api";
import { FaPlay } from "react-icons/fa";
import { convertRuntime } from "../helpers/RuntimeConveter";
import RecomMovies from "./RecomMovies";
import CastMovie from "./CastMovie";
import OverlayTrailer from "../components/OverlayTrailer";

const Detail = () => {
  const { id } = useParams();
  const idMovie = id.toString();
  const urlPoster = "https://image.tmdb.org/t/p/w300";
  const backdrop = "https://image.tmdb.org/t/p/original";

  //const videoRef = useRef(null);
  //OVERLAY STATE
  const [showOverlay, setShowOverlay] = useState(false);

  //MOVIE DETAIL
  const {
    isLoading,
    data: movie,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie", idMovie],
    queryFn: () => getMovie(idMovie),
  });

  const runTimeReturned = movie && convertRuntime(movie.runtime);
  //console.log(runTimeReturned);

  const handleError = (event) => {
    event.target.src = defaultImage;
  };

  //HANDLER OVERLAY MOVIE TRAILER
  const openOverlay = () => {
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };
  /*
  const handleClickOutside = (event) => {
    if (videoRef.current && !videoRef.current.contains(event.target)) {
      closeOverlay();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);*/

  if (isLoading) return <div className="text-center">Cargando Detalles...</div>;
  else if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto pt-14">
      {movie && (
        <>
          <div
            className="panel-info rounded-md grid gap-y-2 sm:gap-2 sm:grid-cols-2 p-4 md:grid-cols-2 lg:grid-cols-3 items-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backdrop}${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="image_movie col-span-1">
              <img
                className="rounded-lg m-auto"
                src={`${urlPoster}${movie.poster_path}`}
                alt={movie.title}
                onError={handleError}
              />
              {movie.overview && <div className="box-btn-trailer text-center mt-3">
                <button
                  className="bg-white/20 text-white px-3 py-1 rounded hover:bg-white/30 transition-colors"
                  onClick={openOverlay}
                >
                  <FaPlay className="inline-block text-sm" />
                  <span className="align-middle"> Ver Trailer</span>
                </button>

                {showOverlay && (
                  <div>
                    <OverlayTrailer movieId={id} onClose={closeOverlay} />
                  </div>
                )}
              </div>}
              
            </div>
            <div className="description p-3 text-white/90 lg:col-span-2 h-full">
              <div className="details-movie">
                <h2 className="font-semibold text-2xl text-center">
                  {movie.title}
                </h2>
                <p className="italic text-center">
                  {movie.tagline && `"${movie.tagline}"`}
                </p>

                <div className="date">
                  <div className="bg-white/10 rounded-lg p-4 leading-6 mt-2">
                    <p>
                      <span className="font-medium">
                        Título original: &nbsp;
                      </span>
                      {movie.original_title}
                    </p>
                    <p>
                      <span className="font-medium">
                        Fecha de estreno: &nbsp;
                      </span>
                      {movie.release_date}
                    </p>
                    <p>
                      <span className="font-medium">Géneros: &nbsp;</span>
                      {movie.genres.map((g, i) => (
                        <span key={i}> {g.name} </span>
                      ))}
                    </p>
                    <p>
                      <span className="font-medium">Duración: &nbsp;</span>
                      {`${runTimeReturned.h}h ${runTimeReturned.m}m ${runTimeReturned.s}s`}
                    </p>
                    <p>
                      <span className="font-medium">
                        Idioma original: &nbsp;
                      </span>
                      <span className="uppercase">
                        {movie.original_language}
                      </span>
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 mt-4">
                    <h2 className="font-semibold text-center text-lg">
                      Descripción general
                    </h2>
                    
                      {movie.overview
                        ? <p className="text-justify mt-4">{movie.overview}</p>
                        : <p className="text-center mt-4">Ups...! No se encontró ninguna descripción para esta pelicula.</p>}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-8">
            <div className="cast-scroller">
              <h2 className="font-semibold text-xl mb-1 text-center sm:text-start sm:pl-2 md:pl-0">Reparto Principal</h2>
              <div className="cast_scroller border-t-2 border-gray-300 flex overflow-x-scroll py-4">
                <CastMovie idmovie={id} />
              </div>
            </div>
            <div className="recom-movies mt-8">
              <h2 className="font-semibold text-xl mb-1 text-center sm:text-start sm:pl-2 md:pl-0">Películas Recomendadas</h2>
              <div className="border-t-2 border-gray-300 grid sm:grid-cols-2 p-3 md:grid-cols-5 xl:grid-cols-6 gap-2 py-5">
                <RecomMovies idMovie={id} />
              </div>
            </div>
          </div>
          <div className="section-recom-movies"></div>
        </>
      )}
    </div>
  );
};

export default Detail;
