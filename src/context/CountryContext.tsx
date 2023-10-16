import { createContext } from "react";

// Define the interface for the country data
export interface Country {
  foo: string;
  name: {
    official: string;
    common: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  flags: {
    png: string;
    alt: string;
  };
  population: number;
  region: string;
  capital: string;
  borders: string[];
  cca3: string;
  subregion: string;
  tld: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    }
  },
  languages: {
    [key: string]: string
  }
}


// Define the interface for the CountryContextType
interface CountryContextType {
  countries: Country[];
  setCountries: (countries: Country[]) => void;
}

// Create a context using createContext
export const CountryContext = createContext<CountryContextType>({
  countries: [],
  setCountries: () => {
    console.log("hi");
  },
});
