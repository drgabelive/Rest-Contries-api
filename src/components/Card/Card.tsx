// import statements

import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

// Card typescript definition

type CardProps = {
  flag: string;
  country: string;
  population: number;
  region: string;
  capital: string;
  alt: string;
};

// Card functional component definition

const Card = (props: CardProps) => {
  // theme Context and styling
  const LightTheme = { backgroundColor: "#fff", color: "#000" };
  const DarkTheme = { backgroundColor: "#2B3844", color: "#fff" };
  const { theme } = useContext(ThemeContext);

  return (
    <Link to={`/details/${props.country}`} className="cardLink">
      <div className="main-container">
        <div
          style={theme === "light" ? LightTheme : DarkTheme}
          className="card-container"
        >
          {/* Rendering the country details  */}
          <div>
            <img className="flag" src={props.flag} alt={props.alt} />
          </div>
          <div className="details">
            <div>
              <span className="country">{props.country}</span>
            </div>
            <div>
              <p className="par first-par">
                Population:{" "}
                <span className="population">{props.population}</span>
              </p>
              <p className="par">
                Region: <span className="region">{props.region}</span>
              </p>
              <p className="par">
                Capital: <span className="capital">{props.capital}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
