import { createContext } from "react";

interface Country {
   name: { official: string };
   flags: {png: string, alt: string};
   population: number;
   region: string;
   capital: string;
 }
 interface CountryContextType{
   countries: Country[];
  setCountries: (countries: Country[]) => void;
 }

export const CountryContext = createContext<CountryContextType>({
  countries: [],
  setCountries: ()=>{console.log("hi")}, 
});