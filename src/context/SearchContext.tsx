import { createContext } from "react";



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
