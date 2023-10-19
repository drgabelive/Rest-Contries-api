import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Container } from "./Container.ts";
import "./index.css";
import { CountryRepo } from "./repository/CountryRepository.ts";

// eslint-disable-next-line react-refresh/only-export-components
export const container = new Container();
container.bind(CountryRepo.name, (): CountryRepo => new CountryRepo());
// container.bind(Filter.name, (countries:CountryModel[]): Filter => new Filter(countries), false)

export const ContainerContext = createContext(container);

// Create Root and Render:
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContainerContext.Provider value={container}>
      <App />
    </ContainerContext.Provider>
  </React.StrictMode>
);
