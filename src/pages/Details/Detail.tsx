import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./details.css";
import { ThemeContext } from "../../context/themeContext";

interface BorderCountry {
  name: string;
}
interface CountryDetails {
  name: {
    official: string;
    nativeName: { [key: string]: { official: string; common: string } };
    common: string;
  };
  flags: { png: string; alt: string };
  population: number;
  region: string;
  capital: string;
  subregion: string;
  tld: string;
  currencies: { [key: string]: { name: string } };
  languages: { [key: string]: string };
  borders?: string[];
}

const BorderCountryCard = (props: BorderCountry) => {
  const [bord, setBorder] = useState(props.name);

  useEffect(() => {
    axios
      .get<CountryDetails[]>(
        `https://restcountries.com/v3.1/alpha/${props.name}`
      )
      .then((res) => {
        setBorder(res.data[0].name.common);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="border-row">
      <p className="border-row-p">{bord}</p>
    </div>
  );
};

function Detail() {
  const { countryName } = useParams();
  const [country, setCountry] = useState<CountryDetails | null>(null);
  const { theme } = useContext(ThemeContext);
  const LightTheme = {
    backgroundColor: "#fff",
    color: "#000",
    height: "84vh",
  };
  const DarkTheme = {
    backgroundColor: "#202C36",
    color: "#fff",
    height: "84vh",
  };

  useEffect(() => {
    if (countryName) {
      axios
        .get<CountryDetails[]>(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        )
        .then((res) => {
          if (res.data) setCountry(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <div
      style={theme === "light" ? LightTheme : DarkTheme}
      className="single-container"
    >
      <div className="back">
        <Link to={`/`}>
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <p>Back</p>
      </div>
      {country && (
        <div className="details-main">
          <div className="single-card">
            <img
              className="single-flag"
              src={country.flags.png}
              alt={country.flags.alt}
            />
          </div>
          <div className="details-main-main">
            {/* details of country */}
            <div className="details-info">
              <div className="details">
                <h2 className="name">{country.name.official}</h2>
              </div>
              <div className="detail-container">
                <div>
                  <p className="par2">
                    Native Name:
                    <span className="native-name">
                      {Object.keys(country.name.nativeName).map((el, key) => {
                        return (
                          <span className="native" key={key}>
                            {country.name.nativeName[el].common + " "}
                          </span>
                        );
                      })}
                    </span>
                  </p>
                  <p className="par2">
                    Population:{" "}
                    <span className="population">{country.population}</span>
                  </p>
                  <p className="par2">
                    Region: <span className="region">{country.region}</span>
                  </p>
                  <p className="par2">
                    Sub Region:{" "}
                    <span className="sub-region">{country.subregion}</span>
                  </p>
                  <p className="par2">
                    Capital:
                    <span className="capital">{country.capital[0]}</span>
                  </p>
                </div>
                <div className="detail-container-2">
                  <p className="par2">
                    Top Level Domain:{" "}
                    <span className="top-level">{country.tld}</span>
                  </p>
                  <p className="par2">
                    Currencies:
                    <span className="capital">
                      {Object.keys(country.currencies).map((el, key) => {
                        return (
                          <span key={key}>{country.currencies[el].name}</span>
                        );
                      })}
                    </span>
                  </p>
                  <p className="par2">
                    Languages:{" "}
                    <span className="language">
                      {Object.values(country?.languages).map((el, key) => {
                        return <span key={key}>{el + " "}</span>;
                      })}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="border-container">
              <p className="par_2">Border Countries:</p>

              <div className="country-btns">
                {country.borders
                  ? country.borders.map((el, key) => {
                      return <BorderCountryCard key={key} name={el} />;
                    })
                  : "None"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
