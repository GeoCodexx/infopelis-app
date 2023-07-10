import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
  },
  params: {
    api_key: "38e8af813419a0bf35589e9e45f70570",
    language: "es",
    include_adult: false,
  },
});

//OBTIENE LISTA DE GENEROS DE PELICULAS
export const getGenres = async () => {
  const res = await instance.get("/genre/movie/list");
  return res.data;
};

//HOME
export const getUpcomingMovies = async (page) => {
  const res = await instance.get("/discover/movie", { params: { page: page } });
  return res.data;
};

//PELIS POPULARES
export const getPopularMovies = async (page) => {
  const res = await instance.get("/movie/popular", { params: { page: page } });
  return res.data;
};

//PELIS EN ESTRENO
export const getPremiereMovies = async (page) => {
  const res = await instance.get("/movie/now_playing", {
    params: { page: page },
  });
  return res.data;
};

//BUSQUEDA POR TITULO
export const getSearchedMovies = async (page, query) => {
  const res = await instance.get("/search/movie", {
    params: { page: page, query },
  });
  return res.data;
};

//BUSQUEDA POR GENERO
export const getMoviesByGenre = async (page, genres) => {
  const res = await instance.get("/discover/movie", {
    params: { page: page, with_genres: genres },
  });
  return res.data;
};

//BUSQUEDA POR RANGO DE AÑOS
export const getMoviesByYear = async (page, rangeAnio) => {
  const res = await instance.get("/discover/movie", {
    params: {
      page: page,
      "primary_release_date.gte": `${rangeAnio[0]}-01-01`,
      "primary_release_date.lte": `${rangeAnio[1]}-12-31`,
    },
  });
  return res.data;
};

//BUSQUEDA POR RANGO DE AÑOS
export const getMoviesByRating = async (page, rating) => {
  const res = await instance.get("/discover/movie", {
    params: {
      page: page,
      "vote_average.gte": rating[0],
      "vote_average.lte": rating[1],
      sort_by: "popularity.desc",
    },
  });
  return res.data;
};
//OBTENER PELICULA DETALLES
export const getMovie = async (id) => {
  const res = await instance.get(`/movie/${id}`);
  return res.data;
};

//OBTENER CREDITOS DE PELICULA
export const getMovieCredits = async (id) => {
  const res = await instance.get(`/movie/${id}/credits`);
  return res.data;
};

//OBTENER PELICULAS RECOMENDADAS
export const getRecomMovies = async (page, id) => {
  const res = await instance.get(`/movie/${id}/recommendations`, {
    params: { page: page },
  });
  return res.data;
};

//OPTENER VIDEOS POR PELICULA
//movie/455476/videos
export const getMovieVideos = async (id) => {
  const response = await instance.get(`/movie/${id}/videos`);
  return response.data;
};
