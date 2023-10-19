import { useContext } from "react";
import MySelect from "../MySelect/MySelect";
import { CountryContext } from "../../context/CountryContext";
// import axios from "axios";
import "./Search.css";


// Define the Search component
function Search(props: { theme: string }) {
  // Country Context and State Usage:
  const { searchTerm } = useContext(CountryContext);
  // Search Input Change Handler:
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {

    const searchValue = event.currentTarget.value;
    // console.log(searchValue)
    searchTerm.set(searchValue)
    
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
            style={{ height: "15px", width: "40px" }}
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
