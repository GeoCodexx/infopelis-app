import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdClose,
  MdDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { useEffect } from "react";
import { useContext } from "react";
import Contexto from "../context/Context";
import { DarkModeContext } from "../context/DarkModeProvider";
//import { useRef } from "react";

const NavBar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isCollapFilter, setIsCollapFilter } = useContext(Contexto);

  const location = useLocation();
  const shouldHideFilter = location.pathname.startsWith("/detail/");


  const navegacion = useNavigate();
  /*const location = useLocation();
  const cleanSearchBar = location.pathname.startsWith("/detail/");*/

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isCollapsedSearch, setIsCollapsedSearch] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Función de búsqueda que se ejecuta después del debounce
    const search = () => {
      //realizar la lógica de búsqueda o llamar a una función de búsqueda
      //console.log('Realizando búsqueda:', searchString);
      navegacion(`/search/${searchString}`);
    };

    // Aplicar el efecto de debounce utilizando setTimeout
    const delayDebounceFn = setTimeout(() => {
      if (searchString) {
        search();
      }
    }, 1500);

    // Limpieza: cancelar el timeout si el componente se desmonta o el término de búsqueda cambia
    return () => clearTimeout(delayDebounceFn);
  }, [searchString]);

  const handleInputChange = (event) => {
    setSearchString(event.target.value);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setRotation(rotation + 90);
  };

  const toggleCollapseFilter = () => {
    setIsCollapFilter(!isCollapFilter);
    isCollapFilter && window.scrollTo(0, 0);

  };

  const toggleCollapseSearch = () => {
    setIsCollapsedSearch(!isCollapsedSearch);
  };

  return (
    <>
      <div
        className={`fixed w-full z-50 bg-white shadow-md ${
          darkMode ? "dark" : ""
        }`}
      >
        <nav className="navbar px-6 py-2 relative">
          <div className="flex justify-between sm:justify-center items-center">
            {/**BUTTON MENU HAMBURGER*/}
            <div className="items-center pt-2">
              <button
                onClick={toggleCollapse}
                className="px-2 sm:hidden transition-transform transform-gpu duration-300 ease-in-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {isCollapsed ? (
                  <GiHamburgerMenu className="w-6 h-6" />
                ) : (
                  <MdClose className="w-6 h-6" />
                )}
              </button>
            </div>

            <div className="logo">
              <Link to="/" className="flex justify-center">
                <RiMovie2Line className="text-red-500 text-2xl sm:text-4xl mt-1 sm:mt-0" />
                <span className="text-2xl sm:text-3xl font-bold">
                  InfoPelis
                </span>
              </Link>
            </div>
            {/**NAVEGATION LINKS NAVBAR */}
            <div className="nav-links sm:w-2/4 hidden sm:flex sm:justify-evenly px-10  text-lg">
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-red-500 sm:mr-2 font-semibold"
                    : "sm:mr-2"
                }
              >
                Inicio
              </NavLink>
              <NavLink
                to="/premieres"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-red-500 sm:mr-2 font-semibold"
                    : "sm:mr-2"
                }
              >
                Estrenos
              </NavLink>
              <NavLink
                to="/populars"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-red-500 mr-2 font-semibold"
                    : ""
                }
              >
                Populares
              </NavLink>
            </div>

            {/**SEARCHBAR MAIN */}
            <div
              className={`search-engine ${
                darkMode ? "bg-[#242b33]" : "bg-zinc-100 "
              } items-center p-2 rounded-2xl hidden sm:flex lg:w-1/4`}
            >
              <span className="mr-3">
                <FaSearch />
              </span>
              <input
                className={`focus:outline-none w-full ${
                  darkMode ? "bg-[#242b33]" : "bg-zinc-100 "
                }`}
                type="search"
                placeholder="Buscar película..."
                autoCorrect="off"
                autoComplete="off"
                value={searchString}
                onChange={handleInputChange}
              />
            </div>

            {/**RIGHT BUTTONS MOVIL */}
            <div className="btns-menu-movil flex items-center sm:ml-10">
              <button className={`sm:hidden ${shouldHideFilter && 'mr-4'}`} onClick={toggleCollapseSearch}>
                {isCollapsedSearch ? (
                  <FaSearch />
                ) : (
                  <MdClose className="w-6 h-6" />
                )}
              </button>
              {!shouldHideFilter && <button onClick={toggleCollapseFilter} className="sm:hidden mx-4">
                {isCollapFilter ? (
                  <FaFilter />
                ) : (
                  <MdClose className="w-6 h-6" />
                )}
              </button>}

              {darkMode ? (
                <button onClick={toggleDarkMode} title="Tema Claro">
                  <MdOutlineLightMode className="w-5 h-5" />
                </button>
              ) : (
                <button
                  className="sm:shadow sm:rounded-full sm:p-1 sm:border sm:border-gray-200"
                  title="Tema Oscuro"
                  onClick={toggleDarkMode}
                >
                  <MdDarkMode className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          {/*mobile box search */}
          <div
            className={`search-box-movil bg-zinc-100 flex items-center p-2 rounded-2xl mt-1 ${
              isCollapsedSearch ? "hidden" : "block"
            }`}
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
              onChange={handleInputChange}
            />
          </div>

          {/* <!-- mobile menu --> */}
          <div
            className={`${
              darkMode ? "dark" : ""
            } menu-collapsible bg-white absolute top-full left-0 w-full border-t border-gray-300 z-10 ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            <ul className="menu-mobil-collapsible shadow-lg">
              <li
                className={`py-2 px-4 hover:shadow ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                } transition duration-200`}
              >
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "active font-bold flex items-center"
                      : "flex items-center hover:font-semibold transition duration-250"
                  }
                >
                  Inicio
                </NavLink>
              </li>
              <li
                className={`py-2 px-4 hover:shadow ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                } transition duration-200`}
              >
                <NavLink
                  to="/premieres"
                  className={({ isActive }) =>
                    isActive
                      ? "active font-bold flex items-center"
                      : "flex items-center hover:font-semibold transition duration-250"
                  }
                >
                  Estrenos
                </NavLink>
              </li>
              <li
                className={`py-2 px-4 hover:shadow ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                } transition duration-200`}
              >
                <NavLink
                  to="/populars"
                  className={({ isActive }) =>
                    isActive
                      ? "active font-bold flex items-center"
                      : "flex items-center hover:font-semibold transition duration-250"
                  }
                >
                  Populares
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="backdrop-blur-sm bg-white/30 absolute top-full left-0"></div>
    </>
  );
};

export default NavBar;
