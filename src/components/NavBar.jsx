import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/Logo.png";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Inicio
        </NavLink>
        <NavLink to="/premieres">Estrenos</NavLink>
        <NavLink to="/populars">Populares</NavLink>
      </div>
      <div className="search-engine">
        <span>icon search</span>
        <input
          type="search"
          placeholder="Busque aquí su película"
          autoCorrect="off"
          autoComplete="off"
        />
      </div>
    </nav>
  );
};

export default NavBar;
