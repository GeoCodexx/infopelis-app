import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGU4YWY4MTM0MTlhMGJmMzU1ODllOWU0NWY3MDU3MCIsInN1YiI6IjY0Mzg2NzBhMWQ1Mzg2MDExMzViOWNmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gAmf4YTGDQQEQAtVpq-sydlrYkKQwjahksyiu4hDgSU",
  },
});

export const getGenres = async () => {
  const res = await instance.get("/genre/movie/list?language=en");
  return res.data;
};
