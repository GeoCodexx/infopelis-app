import "./App.css";
import Filter from "./components/Filter";
import NavBar from "./components/NavBar";
import Router from "./routes/Router";

function App() {
  return (
    <>
      <NavBar />
      <Filter />
      <Router />
    </>
  );
}

export default App;
