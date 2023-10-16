/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useMemo, useState } from "react";
import { CountryContext } from "./context/CountryContext";
import { ThemeContext } from "./context/themeContext";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Details/Detail";
import axios from "axios";
import { SearchContext, SearchCriteria } from "./context/SearchContext";

// Define a TypeScript interface for the structure of a country
export interface Country {
  foo: string;
  name: {
    official: string;
    common: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  flags: {
    png: string;
    alt: string;
  };
  population: number;
  region: string;
  capital: string;
  borders: string[];
  cca3: string;
  subregion: string;
  tld: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    }
  },
  languages: {
    [key: string]: string
  }
}


// Define the main functional component of the app
function App() {
  // Set up state for countries and theme
  const [countries, setCountries] = useState<Country[]>([]);
  const [theme, setTheme] = useState("light");
  const [criteria, setCriteria] = useState<SearchCriteria>({
    title: null,
    region: null,
  });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
        console.log('first fetch')
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
  const searchValue = useMemo(() => ({ criteria, setCriteria}), [criteria, setCriteria]);

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
      <SearchContext.Provider value={searchValue}>
        <BrowserRouter>
          <div style={theme === "light" ? LightTheme : DarkTheme}>
            <Navbar theme={theme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:countryName" element={<Detail />} />
            </Routes>
          </div>
        </BrowserRouter>
      </SearchContext.Provider>
      </CountryContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
