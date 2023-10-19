import { createContext } from "react";
import { CountryModel } from "../model/CountryModel";

// Define the interface for the country data
export interface CountryAPIType {
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
  capital: string[];
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
export interface CountryContextType {
  countries: CountryModel[];
  setCountries: (countries: CountryModel[]) => void;
  region: {
    get: string;
    set: (region: string) => void;
  }
  searchTerm: {
    get: string;
    set: (searchTerm: string) => void;
  }
}

// Create a context using createContext
export const CountryContext = createContext<CountryContextType>({
  countries: [],
  setCountries: () => {
    console.log("hi");
  },
  region: {
    get: "",
    set: ()=>{ console.log("region setter unimplemented") }
  },
  
  searchTerm: {
    get: "",
    set: ()=>{ console.log("searchTerm setter unimplemented") }
  }
});


interface NativeNameType {
  [key: string]: {
    official: string;
    common: string;
  };
}

export interface FlagInfoType {
  png: string;
  alt: string;
}

interface CurrencyType {
  [key: string]: {
    name: string;
    symbol: string;
  }
}

interface LanguageType {
  [key: string]: string
}

export interface CountryPropType {
  officialName: string
  commonName: string
  nativeNames: NativeNameType
  flagInfo: FlagInfoType
  population: number
  region: string;
  capital: string;
  borderCountryNameAbbreviations: string[];
  cca3: string;
  subregion: string;
  tld: string[];
  currencies: CurrencyType
  languages: LanguageType
}