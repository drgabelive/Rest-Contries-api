import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import Search from "../../components/Search/Search";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const LightTheme = { backgroundColor: "#fff", color: "#000" };
  const DarkTheme = { backgroundColor: "#202C36", color: "#fff" };
  return (
    <div style={theme === "light" ? LightTheme : DarkTheme}>
      <Search theme={theme} />
      <Hero />
    </div>
  );
};

export default Home;
