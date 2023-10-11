import { common } from "@mui/material/colors";
import { createContext } from "react";

// // Define the interface for the country data
// export interface Country {
//   foo: string;
//   name: {
//     official: string;
//     common: string;
//     nativeName: {
//       [key: string]: {
//         official: string;
//         common: string;
//       };
//     };
//   };
//   flags: {
//     png: string;
//     alt: string;
//   };
//   population: number;
//   region: string;
//   capital: string;
//   borders: string[];
//   cca3: string;
//   subregion: string;
//   tld: string[];
//   currencies: {
//     [key: string]: {
//       name: string;
//       symbol: string;
//     }
//   },
//   languages: {
//     [key: string]: string
//   }
// }

// // Define the interface for the CountryContextType
// interface CountryContextType {
//   countries: Country[];
//   setCountries: (countries: Country[]) => void;
// }

export interface SearchCriteria {
  title: string | null;
  region: string | null;
}

export interface SearchContextType {
  criteria: SearchCriteria;
  setCriteria: (criteria: SearchCriteria) => void;
}

// Create a context using createContext
export const SearchContext = createContext<SearchContextType>({
  criteria: { title: null, region: null },
  setCriteria: () => {
    console.log("hi");
  },
});
