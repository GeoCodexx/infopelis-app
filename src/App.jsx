import "./App.css";
import Filter from "./components/Filter";
import NavBar from "./components/NavBar";
import Router from "./routes/Router";
import "@smastrom/react-rating/style.css";

function App() {
  const resetFilterInputs = () => {
    setInput1("");
    setInput2("");
  };
  return (
    <>
      <NavBar resetFilterInputs={resetFilterInputs}/>
      <Filter />
      <Router />
    </>
  );
}

export default App;
