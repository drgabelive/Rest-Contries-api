import { useEffect, useContext } from "react";
import axios from "axios";
import Card from "../Card/Card";
import { CountryContext } from "../../context/CountryContext";

interface Country {
  name: { official: string };
  flags: { png: string; alt: string };
  population: number;
  region: string;
  capital: string;
}

const Hero = () => {
  const { countries, setCountries } = useContext(CountryContext);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data as Country[]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="cards-container">
        {countries.map((el) => {
          return (
            <Card
              key={el.name.official}
              flag={el.flags.png}
              country={el.name.official}
              population={el.population}
              region={el.region}
              capital={el.capital}
              alt={el.flags.alt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
