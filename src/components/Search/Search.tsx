// import { Select } from "@mui/material"

import MySelect from "../MySelect/MySelect"

function Search() {
  return (
    <div className="search-container">

        <div className="search">
        <span className="search-span">
            <i className="glass fa fa-search" style={{height: '20px', width: '40px'}}></i>
            <input className="input" placeholder="Search for a country..."></input>
        </span>
        </div>
    <div>
        <MySelect />
    </div>
    </div>
  )
}

export default Search