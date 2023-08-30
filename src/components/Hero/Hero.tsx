import { useEffect, useContext } from "react";
import axios from "axios";
import Card from "../Card/Card";
import { CountryContext } from "../../context/CountryContext";

// Define the interface for the country data
interface Country {
  name: { official: string };
  flags: { png: string; alt: string };
  population: number;
  region: string;
  capital: string;
}

// Define the Hero component
const Hero = () => {
  const { countries, setCountries } = useContext(CountryContext);

  // Fetch country data using useEffect hook:
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data as Country[]); // Update countries with fetched data
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array means this effect runs only once after initial render

  // Render the Hero component
  return (
    <div>
      <div className="cards-container">
        {countries.map((el) => {
          // console.log(typeof el.capital);
          if (el.capital) {
            let foo = "";
            el.capital.map((capital: string, i: number) => {
              foo += capital;
              if (i != el.capital.length - 1) foo += ", ";
            });
            console.log(foo);
            el.foo = foo;
          }

          return (
            <Card
              key={el.name.official}
              flag={el.flags.png}
              country={el.name.official}
              population={el.population}
              region={el.region}
              capital={el.foo}
              alt={el.flags.alt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
