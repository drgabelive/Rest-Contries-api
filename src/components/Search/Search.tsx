import { useContext } from "react";
import MySelect from "../MySelect/MySelect";
import { CountryContext } from "../../context/CountryContext";
import axios from "axios";
import "./Search.css";

// Define the interface for the country data
interface Country {
  foo: string;
  name: { official: string };
  flags: { png: string; alt: string };
  population: number;
  region: string;
  capital: string;
}

// Define the Search component
function Search(props: { theme: string }) {
  // Country Context and State Usage:
  const { setCountries } = useContext(CountryContext);
  // Search Input Change Handler:
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    if (searchValue) {
      axios
        .get<Country[]>(`https://restcountries.com/v3.1/name/${searchValue}`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get<Country[]>(`https://restcountries.com/v3.1/all`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // Render the Search component
  return (
    
        <div className="search-container">
            <div className="search">
               <span
          className="search-span"
          style={props.theme === "light" ? {} : { backgroundColor: "#2B3844" }}
        >
          <i
            className="glass fa fa-search"
            style={{ height: "20px", width: "40px" }}
          ></i>
          <input
            className="input"
            style={
              props.theme === "light" ? { color: "black" } : { color: "white" }
            }
            placeholder="Search for a country..."
            onChange={handleChange}
          />
               </span>
            </div>
          <div>
        <MySelect />
      </div>
    
    </div>
  );
}

export default Search;
