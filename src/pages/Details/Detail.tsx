import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { CountryModel } from "../../model/CountryModel";
import { CountryRepo } from "../../repository/CountryRepository";
import "./details.css";
import { ContainerContext } from "../../main";

function Detail() {
  const { countryName } = useParams();
  const { theme } = useContext(ThemeContext);
  const container = useContext(ContainerContext)
  const countryRepo = container.resolve<CountryRepo>(CountryRepo.name)
  const country: CountryModel | null = countryRepo.getCountryByName(countryName || "")

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

      {country && (
        <div className="details-main">
          <div className="single-card">
            <img
              className="single-flag"
              src={country.flagInfo.png}
              alt={country.flagInfo.alt}
            />
          </div>
          <div className="details-main-main">
            {/* details of country */}
            <div className="details-info">
              <div className="details">
                <h2 className="name">{country.officialName}</h2>
              </div>
              <div className="detail-container">
                <div className="detail-container-2">
                  <p className="par2">
                    Native Name:{" "}
                    <span className="native-name">
                      {country.commonNativeName}
                    </span>
                  </p>
                  <p className="par2">
                    Population:{"  "}
                    <span className="population">
                      {country.population?.toLocaleString("en-US")}
                    </span>
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
                    <span className="capital"> {country.capital}</span>
                  </p>
                </div>
                <div className="detail-container-2">
                  <p className="par2">
                    Top Level Domain:{" "}
                    <span className="top-level"> {country.tld}</span>
                  </p>
                  <p className="par2">
                    Currencies:
                    <span className="capital">
                      {" " + country.currencies}
                    </span>
                  </p>
                  <p className="par2">
                    Languages:{" "}
                    <span className="language">
                      {country.languages}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="border-container">
              <p className="par_2">Border Countries:</p>

              <div className="country-btns">
                {

                  country.borderCountries?.length > 0
                    ? country.borderCountries.map((country) => {

                      return (
                        <div
                          style={theme === "light" ? LightTheme : DarkTheme}
                          className="border-row"
                        >
                          <p className="border-row-p">
                            <Link
                              to={`/details/${country.officialName}`}
                              style={theme === "light" ? LightTheme : DarkTheme}
                              className="border-row-p-link"
                            >
                              {country.commonName}
                            </Link>
                          </p>
                        </div>
                      );
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
