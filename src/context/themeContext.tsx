import { createContext } from "react";

// Define the interface for the ThemeContextType
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

// Create a context using createContext
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {
    console.log("hi");
  },
});
