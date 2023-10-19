import { CountryModel } from "../model/CountryModel";
import { FilterInterface } from "./FilterInterface";

export class OfficialNameSearchFilter implements FilterInterface {
    private officialName: string;
    constructor(officialName: string) {
        this.officialName = officialName
    }
    apply(countries: CountryModel[]) {
        return countries.filter(
            country => country.officialName
                .toLowerCase()
                .includes(this.officialName.toLowerCase()))
    }
}