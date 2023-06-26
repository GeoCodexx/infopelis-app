import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGU4YWY4MTM0MTlhMGJmMzU1ODllOWU0NWY3MDU3MCIsInN1YiI6IjY0Mzg2NzBhMWQ1Mzg2MDExMzViOWNmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gAmf4YTGDQQEQAtVpq-sydlrYkKQwjahksyiu4hDgSU",
  },
  params: {
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
  const res = await instance.get("/movie/upcoming", { params: { page: page } });
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
  const res = await instance.get("/search/movie", { params: { page: page } });
  const filtered = res.data.results.filter((p) => {
    genres.forEach((element) => {
      return p.genre.ids.inclues(element) && p;
    });
  });
  return filtered;
};
//captured images Movies: https://api.themoviedb.org/3/movie/{movie_id}/images
