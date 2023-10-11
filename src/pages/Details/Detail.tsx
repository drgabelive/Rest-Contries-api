import { useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
// import axios from "axios";
import "./details.css";
import { ThemeContext } from "../../context/themeContext";
import { CardProps } from "../../components/Card/Card";
import { Country, CountryContext } from "../../context/CountryContext";
// import { getPopoverUtilityClass } from "@mui/material";

//  Define TypeScript interfaces to represent the expected structure of data
interface BorderCountry {
  name: string;
}
interface CountryDetails {
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
    };
  };
  languages: {
    [key: string]: string;
  };
}

// Create the main functional component Detail
function Detail() {
  const { countryName } = useParams();
  const { countries, setCountries } = useContext(CountryContext);
  // const [country, setCountry] = useState<CountryDetails | null>(null);
  const { theme } = useContext(ThemeContext);
  const location: { state: CardProps } = useLocation();
  const props: CardProps = location.state;

  const LightThemeBack = {
    backgroundColor: "#fff",
    color: "#000",
    textDecoration: "none",
    padding: "12px 20px",
    width: "fit-content",
  };
  const DarkThemeBack = {
    backgroundColor: "#2B3844",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 20px",
    width: "fit-content",
  };
  const LightTheme = {
    backgroundColor: "#fff",
    color: "#000",
  };
  const DarkTheme = {
    backgroundColor: "#202C36",
    color: "#fff",
  };

  function getBorderCountries(
    countries: Country[],
    country: Country
  ): string[] {
    const borderCountries: Country[] = [];

    if (country.borders) {
      country.borders.map(function (accronym: string) {
        countries.filter((country) => country.cca3 === accronym);
        borderCountries.push(
          countries.filter((country) => country.cca3 === accronym)[0]
        );
      });
      // console.log ("country: ", country.name.official, " borders: ", borderCountries.map(country => country.name.common))
    }
    return borderCountries.map((country) => country.name.common);
  }

  function getNativeName(country: Country) {
    let nativeName = "";

    if (country.name.nativeName) {
      // console.log(Object.keys(country.name.nativeName));
      Object.keys(country.name.nativeName).map((el, key) => {
        nativeName += country.name.nativeName[el].common;

        nativeName +=
          Object.keys(country.name.nativeName).length != key + 1 ? ", " : null;
      });
    }

    return nativeName;
  }

  function getTLD(country: Country) {
    let tld = "";

    if (country.tld) {
      country.tld.map(function (el, key) {
        tld += el;
        tld += country.tld.length != key + 1 ? "," : "";
      });
    }

    return tld;
  }

  function getCurrencies(country: Country): string {
    let currencies = "";

    if (country.currencies) {
      Object.keys(country.currencies).map((el, key) => {
        // console.log(el, key);
        // This adds a comma if its not on the last text
        currencies += country.currencies[el].name;

        currencies +=
          Object.keys(country.currencies).length != key + 1 ? ", " : "";
      });
    }

    return currencies;
  }

  function getPopulation(countryName: string): number {
    const country: Country = findCountry(countries, countryName);
    return country.population;
  }

  function getCapital(countryName: string): string {
    const country: Country = findCountry(countries, countryName);
    return country.capital;
  }

  function getRegion(countryName: string): string {
    const country: Country = findCountry(countries, countryName);
    return country.region;
  }

  function getSubregion(countryName: string): string {
    const country: Country = findCountry(countries, countryName);
    return country.subregion;
  }

  function getLanguages(country: Country): string {
    let languages = "";

    if (country.languages) {
      Object.keys(country.languages).map((el, key) => {
        // console.log(el, key);
        // This adds a comma if its not on the last text
        languages += country.languages[el];

        languages +=
          Object.keys(country.languages).length != key + 1 ? ", " : "";
      });
    }

    return languages;
  }

  function findCountry(countries: Country[], countryName: string): Country {
    return countries.filter(
      (country) => country.name.common === countryName
    )[0];
  }

  return (
    <div
      style={theme === "light" ? LightTheme : DarkTheme}
      className="single-container"
    >
      <Link
        className="back"
        to={`/`}
        style={theme === "light" ? LightThemeBack : DarkThemeBack}
      >
        <div className="material-symbols-outlined">arrow_back</div>
        <div className="b-r " style={{ paddingLeft: "10px" }}>
          Back
        </div>
      </Link>

      {props && (
        <div className="details-main">
          <div className="single-card">
            <img className="single-flag" src={props.flag} alt={props.alt} />
          </div>
          <div className="details-main-main">
            {/* details of country */}
            <div className="details-info">
              <div className="details">
                <h2 className="name">{props.country}</h2>
                {/* <h2 className="name">{props}</h2> */}
              </div>
              <div className="detail-container">
                <div className="detail-container-2">
                  <p className="par2">
                    Native Name:{" "}
                    <span className="native-name">{props.nativeName}</span>
                  </p>
                  <p className="par2">
                    Population:{"  "}
                    <span className="population">
                      {props.population?.toLocaleString("en-US")}
                    </span>
                  </p>
                  <p className="par2">
                    Region: <span className="region">{props.region}</span>
                  </p>
                  <p className="par2">
                    Sub Region:{" "}
                    <span className="sub-region">{props.subregion}</span>
                  </p>
                  <p className="par2">
                    Capital:
                    <span className="capital"> {props.capital}</span>
                  </p>
                </div>
                <div className="detail-container-2">
                  <p className="par2">
                    Top Level Domain:{" "}
                    <span className="top-level"> {props.tld}</span>
                  </p>
                  <p className="par2">
                    Currencies:
                    <span className="capital">{" " + props.currencies}</span>
                  </p>
                  <p className="par2">
                    Languages:{" "}
                    <span className="language">{props.languages}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="border-container">
              <p className="par_2">Border Countries:</p>

              <div className="country-btns">
                {props.borderCountries?.length > 0
                  ? props.borderCountries.map((el, key) => {
                      // return <BorderCountryCard key={key} name={el} />;
                      // create prop object
                      const country = findCountry(countries, el);

                      const props: CardProps = {
                        country: country.name.common,
                        flag: country.flags.png,
                        alt: country.flags.alt,
                        borderCountries: getBorderCountries(countries, country),
                        currencies: getCurrencies(country),
                        nativeName: getNativeName(country),
                        languages: getLanguages(country),
                        tld: getTLD(country),
                        population: getPopulation(el),
                        capital: getCapital(el),
                        region: getRegion(el),
                        subregion: getSubregion(el),
                      };

                      return (
                        <div
                          style={theme === "light" ? LightTheme : DarkTheme}
                          className="border-row"
                        >
                          <p className="border-row-p">
                            <Link
                              to={`/details/${el}`}
                              style={theme === "light" ? LightTheme : DarkTheme}
                              className="border-row-p-link"
                              state={props}
                            >
                              {el}
                            </Link>
                          </p>
                        </div>
                      );
                    })
                  : // ? "some"
                    "None"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
