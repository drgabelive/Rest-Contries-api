import { useContext } from "react";
import { CountryContext } from "../../context/CountryContext";
import Card from "../Card/Card";

const Hero = () => {
  const { countries } = useContext(CountryContext);
  console.log("country count: ", countries.length);
  if (countries.length) {
    return (
      <div className="cc">
        <div className="cards-container">
          {countries.map((country, index) => {
            return <Card key={index} country={country} />;
          })}
        </div>
      </div>
    );
  } else {
    return <div className="Not-Found">No Countries Found!</div>;
  }
};

export default Hero;
