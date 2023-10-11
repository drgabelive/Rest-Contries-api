import { useContext } from "react";
import axios from "axios";
import Card from "../Card/Card";
import { CountryContext, Country } from "../../context/CountryContext";
import { SearchContext } from "../../context/SearchContext";

// Define the Hero component
const Hero = () => {
  const { countries, setCountries } = useContext(CountryContext);
  const { criteria } = useContext(SearchContext);

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
        // console.log(el, key);
        // This adds a comma if its not on the last text
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
      // console.log("-------")
      // Object.keys(country.tld).map((el, key) => {
      //   // This adds a comma if its not on the last text
      //   tld += country.tld[el]

      //   tld +=
      //   Object.keys(country.tld).length != key + 1 ? ", " : null;
      // });
      // console.log("-------")

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

  function filterCountries(country: Country) {
    let isIncluded = false;

    const countryName = country.name.common.toLowerCase();
    const countryRegion = country.region?.toLowerCase() ?? "";

    isIncluded = countryName.includes(criteria.title ?? "");
    isIncluded = isIncluded && countryRegion.includes(criteria.region ?? "");

    return isIncluded;
  }
  const filteredList : Country[] = countries.filter(filterCountries);
  // Render the Hero component
  if(filteredList.length == 0) {
    return (
    <div className="Not-Found">Country Not Found</div>);
  }
  return (
    <div className="cc">
      <div className="cards-container">
        {filteredList.filter(filterCountries).map((el) => {
          const elCapital: string[] = el.capital as unknown as string[];

          if (elCapital) {
            let foo = "";
            elCapital.map((capital: string, i: number) => {
              foo += capital;
              if (i != elCapital.length - 1) foo += ", ";
            });
            el.foo = foo;
          }

          console.log(getLanguages(el));

          return (
            <Card
              key={el.name.official}
              flag={el.flags.png}
              country={el.name.official}
              population={el.population}
              region={el.region}
              capital={el.foo}
              alt={el.flags.alt}
              borderCountries={getBorderCountries(countries, el)}
              nativeName={getNativeName(el)}
              subregion={el.subregion}
              tld={getTLD(el)}
              currencies={getCurrencies(el)}
              languages={getLanguages(el)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
