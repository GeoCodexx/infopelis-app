import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Popular from "../pages/Popular";
import Premiere from "../pages/Premiere";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Search from "../pages/Search";
import FilterByGenre from "../pages/FilterByGenre";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/populars" element={<Popular />} />
      <Route path="/premieres" element={<Premiere />} />
      <Route path="/movies/bygenre" element={<FilterByGenre />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/search/:word" element={<Search />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
