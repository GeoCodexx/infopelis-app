import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Popular from "../pages/Popular";
import Premiere from "../pages/Premiere";
import Home from "../pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/populars" element={<Popular />} />
      <Route path="/premieres" element={<Premiere />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
