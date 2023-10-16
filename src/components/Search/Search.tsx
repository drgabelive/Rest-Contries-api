import { useContext } from "react";
import MySelect from "../MySelect/MySelect";
import "./Search.css";
import { SearchContext } from "../../context/SearchContext";

// Define the Search component
function Search(props: { theme: string }) {
  const { criteria, setCriteria } = useContext(SearchContext);
  // Country Context and State Usage:
  // const { setCountries } = useContext(CountryContext);
  // Search Input Change Handler:
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setCriteria({
      ...criteria,
      title: searchValue,
    });
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
