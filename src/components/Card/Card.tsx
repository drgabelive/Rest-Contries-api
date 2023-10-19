// import statements
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { CountryModel } from "../../model/CountryModel";
import "./Card.css";

export type CardProps = {
  country: CountryModel
};

const Card = (props: CardProps) => {
  
  const LightTheme = { backgroundColor: "#fff", color: "#000" };
  const DarkTheme = { backgroundColor: "#2B3844", color: "#fff" };
  const { theme } = useContext(ThemeContext);

  const country = props.country

  return (
    <Link to={`/details/${country.officialName}`} className="cardLink">
      <div className="main-container">
        <div
          style={theme === "light" ? LightTheme : DarkTheme}
          className="card-container"
        >
          <div>
            <img className="flag" src={country.flagInfo.png} alt={country.flagInfo.alt} />
          </div>
          <div className="details" style={{ paddingLeft: "20px" }}>
            <div>
              <span className="country">{country.officialName}</span>
            </div>
            <div>
              <p className="par first-par">
                Population: 
                <span className="population">
                  {country.population.toLocaleString("en-US")}
                </span>
              </p>
              <p className="par">
                Region: <span className="region">{country.region}</span>
              </p>
              <p className="par">
                Capital: <span className="capital">{country.capital}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
