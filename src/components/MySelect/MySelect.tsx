import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { CountryContext } from "../../context/CountryContext";
import { ThemeContext } from "../../context/themeContext";
import { useContext } from "react";

export default function MySelect() {
  //  state initialization for theme
  const LightTheme = { backgroundColor: "#fff", color: "#000" };
  const DarkTheme = {
    backgroundColor: "#2B3844",
    color: "#fff",
  };

  const { region } = useContext(CountryContext);
  const { theme } = React.useContext(ThemeContext);

  // Event Handler for Select Component:
  const handleChange = (event: SelectChangeEvent) => {
    region.set(event.target.value);

    // const filter = new Filter(countries)
    // filter.add(new RegionFilter(event.target.value))

    // setCountries(filter.execute())
  };

  return (
    <Box sx={{ minWidth: 240 }} border={"none"}>
      <FormControl fullWidth>
        <Select
          // id="demo-simple-select"
          className={`bright11 ${theme === "light" ? "" : "select-dark"} `}
          value={region.get}
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
            value={"americas"}
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
