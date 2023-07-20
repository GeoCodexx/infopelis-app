import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeProvider";

const Footer = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <>
      <footer
        className={`bg-neutral-100 text-center text-white dark:bg-neutral-600 fixed w-full bottom-0 ${
          darkMode && "dark"
        }`}
      >
        <div className="bg-neutral-100 p-1 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 text-sm">
          <a
            className="text-neutral-800 dark:text-neutral-400 font-semibold"
            href="https://github.com/GeoCodexx/"
            target="_blank"
          >
            GeoCodexx
          </a>{" "}
          © {new Date().getFullYear()} - Geordi R.
        </div>
      </footer>
    </>
  );
};

export default Footer;
