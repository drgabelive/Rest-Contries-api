import { createContext } from "react";

// Define the interface for the country data
interface Country {
  foo: string;
  name: { official: string };
  flags: { png: string; alt: string };
  population: number;
  region: string;
  capital: string;
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
