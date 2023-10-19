import { CountryModel } from "../model/CountryModel";

export interface FilterInterface {
    apply: (countries:CountryModel[]) => CountryModel[]
}