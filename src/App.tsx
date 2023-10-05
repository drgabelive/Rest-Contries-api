/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useMemo, useState } from "react";
import { CountryContext } from "./context/CountryContext";
import { ThemeContext } from "./context/themeContext";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Details/Detail";
import axios from "axios"

// Define a TypeScript interface for the structure of a country
interface Country {
  foo: string;
  name: { official: string };
  flags: { png: string; alt: string };
  population: number;
  region: string;
  capital: string;
}

// Define the main functional component of the app
function App() {
  // Set up state for countries and theme
  const [countries, setCountries] = useState<Country[]>([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Create memoized values for context providers
  const value = useMemo(
    () => ({ countries, setCountries }),
    [countries, setCountries]
  );
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  // Define theme styles
  const LightTheme = { backgroundColor: "#fff", color: "#000" };
  const DarkTheme = {
    backgroundColor: "#202C36",
    color: "#fff",
    minHeight: "100vh",
  };

  // Render the app components
  return (
    <ThemeContext.Provider value={themeValue}>
      <CountryContext.Provider value={value}>
        <BrowserRouter>
          <div style={theme === "light" ? LightTheme : DarkTheme}>
            <Navbar theme={theme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:countryName" element={<Detail />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CountryContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
