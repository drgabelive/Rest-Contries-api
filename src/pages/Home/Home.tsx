import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import Hero from "../../components/Hero/Hero";
import Search from "../../components/Search/Search";

// Create the functional component Home
const Home = () => {
  // Use the theme context to access the current theme
  const { theme } = useContext(ThemeContext);

  // Define theme styles for light and dark themes
  const LightTheme = { backgroundColor: "#fff", color: "#000" };
  const DarkTheme = { backgroundColor: "#202C36", color: "#fff" };

  // Render the component
  return (
    <div style={theme === "light" ? LightTheme : DarkTheme}>
      <Search theme={theme} />
      <Hero />
    </div>
  );
};

export default Home;
