import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { GrStarOutline } from "react-icons/gr";
import { MdMovieFilter } from "react-icons/md";

const NavBar = () => {
  const navegacion = useNavigate();
  const [searchBtn, setSearchBtn] = useState("hidden");
  const [menuMobil, setMenuMobil] = useState("hidden");
  const [searchString, setSearchString] = useState("");

  const handleChange = (e) => {
    setTimeout(() => {
      navegacion(`/search/${e.target.value}`);
    }, 3500);
  };

  return (
    <>
      <nav className="navbar px-6 py-2 shadow-lg relative">
        <div className="flex justify-between sm:justify-center items-center">
          <button
            onClick={() =>
              setMenuMobil((state) => (state === "hidden" ? "" : "hidden"))
            }
            className="text-xl px-2 sm:hidden"
          >
            <GiHamburgerMenu />
          </button>

          <div className="logo">
            <Link to="/" className="flex justify-center">
              <RiMovie2Line className="text-red-600 text-4xl" />
              <span className="text-3xl font-bold">InfoPelis</span>
            </Link>
          </div>
          <div className="nav-links sm:w-2/4 hidden sm:flex sm:justify-evenly px-10">
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
          <div className="search-engine bg-zinc-100 items-center p-2 rounded-2xl hidden sm:flex">
            <span className="mr-2">
              <FaSearch />
            </span>
            <input
              className="bg-zinc-100 focus:outline-none w-full"
              type="search"
              placeholder="Buscar película..."
              autoCorrect="off"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="btn-search-movil px-2">
            <button
              className="text-xl sm:hidden"
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
            onChange={handleChange}
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
