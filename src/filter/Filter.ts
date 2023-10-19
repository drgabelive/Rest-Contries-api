import { CountryModel } from "../model/CountryModel";
import { FilterInterface } from "./FilterInterface";

export class Filter {
    private filters: FilterInterface[];
    private countries: CountryModel[];
    constructor(countries: CountryModel[]) {
        this.filters = []
        this.countries = countries
    }

    add(filter: FilterInterface) {
        this.filters.push(filter)
    }

    execute(): CountryModel[] {
        this.filters.map(filter => {
            this.countries = filter.apply(this.countries)
            // console.log(this.countries)
        })
        return this.countries;
    }
}