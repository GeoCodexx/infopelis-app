import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="navbar flex justify-around items-center pr-5">
      <div className="logo w-1/3 sm:w-1/4">
        <Link to="/">
          <img
            className="w-3/4 sm:w-1/2 m-auto"
            src={logo}
            alt="Logo website"
          />
        </Link>
      </div>
      <div className="nav-links w-1/3 sm:w-2/4 flex justify-evenly">
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
      <div className="search-engine w-1/3 sm:w-1/4 bg-zinc-900 flex justify-normal items-center p-2 rounded-2xl">
        <span className="mr-2"><FaSearch /></span>
        <input
        className="bg-zinc-900 focus:outline-none"
          type="search"
          placeholder="Buscar película..."
          autoCorrect="off"
          autoComplete="off"
        />
      </div>
    </nav>
  );
};

export default NavBar;
