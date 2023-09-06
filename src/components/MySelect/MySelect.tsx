import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CountryContext } from "../../context/CountryContext";
import { ThemeContext } from "../../context/themeContext";
import axios from "axios";

// define interface country that will be fetched from the API
interface Country {
  foo: string;
  name: { official: string };
  flags: { png: string; alt: string };
  population: number;
  region: string;
  capital: string;
}

export default function MySelect() {
  //  state initialization for theme
  const LightTheme = { backgroundColor: "#fff", color: "#000" };
  const DarkTheme = { backgroundColor: "#2B3844", color: "#fff" };

  const [region, setRegion] = React.useState("");
  const { setCountries } = React.useContext(CountryContext);
  const { theme } = React.useContext(ThemeContext);

  // fetch countries Data by Region
  const getCountriesByRegion = (region: string) => {
    if (region === "") {
      axios
        .get<Country[]>(`https://restcountries.com/v3.1/all`)
        .then((res) => {
          setCountries(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get<Country[]>(`https://restcountries.com/v3.1/region/${region}`)
        .then((res) => {
          setCountries(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // Event Handler for Select Component:
  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
    getCountriesByRegion(event.target.value);
  };

  // user interface that renders a dropdown (Select) with a list of regions (MenuItem).
  return (
    <Box sx={{ minWidth: 240 }} border={"none"}>
      <FormControl fullWidth>
        <Select
          // id="demo-simple-select"
          className="bright11"
          value={region}
          displayEmpty
          onChange={handleChange}
          sx={theme === "light" ? LightTheme : DarkTheme}
        >
          <MenuItem sx={theme === "light" ? LightTheme : DarkTheme} value={""}>
            Filter by Region
          </MenuItem>
          <MenuItem
            sx={theme === "light" ? LightTheme : DarkTheme}
            value={"africa"}
          >
            Africa
          </MenuItem>
          <MenuItem
            sx={theme === "light" ? LightTheme : DarkTheme}
            value={"america"}
          >
            America
          </MenuItem>
          <MenuItem
            sx={theme === "light" ? LightTheme : DarkTheme}
            value={"asia"}
          >
            Asia
          </MenuItem>
          <MenuItem
            sx={theme === "light" ? LightTheme : DarkTheme}
            value={"europe"}
          >
            Europe
          </MenuItem>
          <MenuItem
            sx={theme === "light" ? LightTheme : DarkTheme}
            value={"oceania"}
          >
            Oceania
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
