import { useLocation } from "react-router-dom";
import "./App.css";
import Filter from "./components/Filter";
import NavBar from "./components/NavBar";
import Router from "./routes/Router";
import "@smastrom/react-rating/style.css";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import { DarkModeProvider } from "./context/DarkModeProvider";

function App() {
  const location = useLocation();
  const shouldHideFilter = location.pathname.startsWith("/detail/");

  return (
    <>
      <DarkModeProvider>
        <NavBar />
        {!shouldHideFilter && <Filter />}
        <Router />
        <ScrollToTop />
        <Footer />
      </DarkModeProvider>
    </>
  );
}

export default App;
