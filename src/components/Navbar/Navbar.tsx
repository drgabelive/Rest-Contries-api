import { useContext } from "react";
import { useState } from "react";
import { ThemeContext } from "../../context/themeContext";

// Interface Definition:
interface Navbar {
  theme: string;
}
function Navbar(props: Navbar) {
  // Theme Context and State Usage:
  const { theme, setTheme } = useContext(ThemeContext);
  const [themeText, setThemeText] = useState("Dark Mode");
  const LightTheme = { backgroundColor: "#fff", color: "#000" };
  const DarkTheme = { backgroundColor: "#2B3844", color: "#fff" };

  // Theme Change Handler:

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
      setThemeText("Light Mode");
    } else {
      setTheme("light");
      setThemeText("Dark Mode");
    }
  };
  return (
    <nav
      style={props.theme === "light" ? LightTheme : DarkTheme}
      className="nav"
    >
      <h2>Where in the world?</h2>
      <span onClick={handleThemeChange} className="nav-span">
        <i
          style={props.theme === "light" ? LightTheme : DarkTheme}
          className="far fa-moon"
        ></i>
        {themeText}
      </span>
    </nav>
  );
}

export default Navbar;
