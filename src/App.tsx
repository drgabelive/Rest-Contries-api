/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
// import { CountryContext } from "./context/CountryContext";
import { ThemeContext } from "./context/themeContext";
import { ContainerContext } from "./main";
import { CountryModel } from "./model/CountryModel";
import Detail from "./pages/Details/Detail";
import Home from "./pages/Home/Home";
import { CountryRepo } from "./repository/CountryRepository";
import { CountryContext, CountryContextType } from "./context/CountryContext";
import { Filter } from "./filter/Filter";
import { RegionFilter } from "./filter/RegionFilter";
import { OfficialNameSearchFilter } from "./filter/OfficialNameSearchFilter";

function App() {
  const [countries, setCountries ] = useState<CountryModel[]>([]);
  const [region, setRegion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");
  const container = useContext(ContainerContext)
  const countryRepo: CountryRepo = container.resolve<CountryRepo>(CountryRepo.name)

  useEffect(() => {

    countryRepo.all()
      .then((countries) => {
        const filter = new Filter(countries)
        filter.add(new RegionFilter(region))
        filter.add(new OfficialNameSearchFilter(searchTerm))
        setCountries(filter.execute())

        console.log(filter.execute())

      })
      .catch(err => console.log("error setting countries", err))

  }, [countryRepo, region, searchTerm]);

  const themeValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  const LightTheme = { backgroundColor: "#fff", color: "#000" };
  const DarkTheme = {
    backgroundColor: "#202C36",
    color: "#fff",
    minHeight: "100vh",
  };

  const countryContextProvider : CountryContextType = {
    countries,
    setCountries,
    region: {
      get: region,
      set: setRegion
    },
    searchTerm: {
      get: searchTerm,
      set: setSearchTerm
    }

  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <CountryContext.Provider value={countryContextProvider}>
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
