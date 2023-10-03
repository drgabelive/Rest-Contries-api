import { useEffect, useContext } from "react";
import axios from "axios";
import Card from "../Card/Card";
import { CountryContext } from "../../context/CountryContext";

// Define the Hero component
const Hero = () => {
  const { countries, setCountries } = useContext(CountryContext);

  // Fetch country data using useEffect hook:
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setCountries(res.data); // Update countries with fetched data
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setCountries]); // Empty dependency array means this effect runs only once after initial render

  // Render the Hero component
  return (
    <div className="cc">
      <div className="cards-container">
        {countries.map((el) => {
          const elCapital: string[] = el.capital as unknown as string[];

          if (elCapital) {
            let foo = "";
            elCapital.map((capital: string, i: number) => {
              foo += capital;
              if (i != elCapital.length - 1) foo += ", ";
            });
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
