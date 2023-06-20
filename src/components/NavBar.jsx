import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { GrStarOutline } from "react-icons/gr";
import { MdMovieFilter } from "react-icons/md";

const NavBar = () => {
  const [searchBtn, setSearchBtn] = useState("hidden");
  const [menuMobil, setMenuMobil] = useState("hidden");

  return (
    <>
      <nav className="navbar px-6 py-2 shadow-lg relative">
        <div className="flex justify-between items-center">
          <button
            onClick={() =>
              setMenuMobil((state) => (state === "hidden" ? "" : "hidden"))
            }
          >
            <GiHamburgerMenu className="text-2xl sm:hidden" />
          </button>

          <div className="logo sm:w-1/4">
            <Link to="/" className="flex align-middle">
              <RiMovie2Line className="text-red-600 text-4xl" />
              <span className="text-3xl font-bold">InfoPelis</span>
            </Link>
          </div>
          <div className="nav-links sm:w-2/4 hidden sm:flex sm:justify-evenly">
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
          <div className="search-engine sm:w-1/4 bg-zinc-100 items-center p-2 rounded-2xl hidden sm:flex">
            <span className="mr-2">
              <FaSearch />
            </span>
            <input
              className="bg-zinc-100 focus:outline-none w-full"
              type="search"
              placeholder="Buscar película..."
              autoCorrect="off"
              autoComplete="off"
            />
          </div>
          <div className="btn-search-movil">
            <button
              className="text-2xl sm:hidden"
              onClick={() =>
                setSearchBtn((state) =>
                  state === "hidden" ? "flex" : "hidden"
                )
              }
            >
              <FaSearch />
            </button>
          </div>
        </div>
        {/*mobile box search */}
        <div
          className={`search-box-movil bg-zinc-100 items-center p-2 rounded-2xl mt-1 ${searchBtn}`}
        >
          <span className="mr-2">
            <FaSearch />
          </span>
          <input
            className="bg-zinc-100 focus:outline-none w-full"
            type="search"
            placeholder="Buscar película..."
            autoCorrect="off"
            autoComplete="off"
          />
        </div>

        {/* <!-- mobile menu --> */}
        <div
          className={`bg-white absolute top-full left-0 w-full ${menuMobil}`}
        >
          <ul className="shadow-lg">
            <li className="py-2 px-4 hover:shadow hover:bg-gray-100 transition duration-200">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "active font-bold flex items-center"
                    : "flex items-center hover:font-semibold transition duration-250"
                }
              >
                <AiOutlineHome className="inline-block align-middle mr-2" />
                Inicio
              </NavLink>
            </li>
            <li className="py-2 px-4 hover:shadow hover:bg-gray-100 transition duration-200">
              <NavLink
                to="/premieres"
                className={({ isActive }) =>
                  isActive
                    ? "active font-bold flex items-center"
                    : "flex items-center hover:font-semibold transition duration-250"
                }
              >
                <MdMovieFilter className="mr-2" />
                Estrenos
              </NavLink>
            </li>
            <li className="py-2 px-4 hover:shadow transition duration-200 hover:bg-gray-100">
              <NavLink
                to="/populars"
                className={({ isActive }) =>
                  isActive
                    ? "active font-bold flex items-center"
                    : "flex items-center hover:font-semibold transition duration-250"
                }
              >
                <GrStarOutline className="mr-2" />
                Populares
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
