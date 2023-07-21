import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryContext } from "./context/CountryContext";
import Home from "./pages/Home/Home";
import Detail from "./pages/Details/Detail";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [country, setCountry] = useState("");
  const value = useMemo(() => ({ country, setCountry }), [country, setCountry]);
  return (
    <CountryContext.Provider value={value}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/details" element={<Detail />}></Route>
        </Routes>
      </BrowserRouter>
    </CountryContext.Provider>
  );
}

export default App;
