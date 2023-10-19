import { CountryModel } from "../model/CountryModel";
import { FilterInterface } from "./FilterInterface";

export class RegionFilter implements FilterInterface {
    private region;
    constructor(region: string) {
        this.region = region
    }
    apply(countries: CountryModel[]) {
        if (!this.region.trim())
            return countries
        
        console.log('region filter applied')
        const countries_ = countries.filter((country) => country.region.toLowerCase() === this.region.toLowerCase())
        console.log(countries_)
        return countries_;
    }
}