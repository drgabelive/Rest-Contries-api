import { useMemo, useState } from "react";
import { CountryContext } from "./context/CountryContext";
import { ThemeContext } from "./context/themeContext";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Details/Detail";
interface Country {
  name: { official: string };
  flags: { png: string; alt: string };
  population: number;
  region: string;
  capital: string;
}

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [theme, setTheme] = useState("light");
  const value = useMemo(
    () => ({ countries, setCountries }),
    [countries, setCountries]
  );
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <CountryContext.Provider value={value}>
        <BrowserRouter>
          <Navbar theme={theme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:countryName" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </CountryContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
