import axios from "axios"
import { CountryAPIType } from "../context/CountryContext"
import { CountryModel } from "../model/CountryModel"


export class CountryRepo {
    // constructor(){}

    _countries: CountryAPIType[] = []

    async all(): Promise<CountryModel[]> {
        if (this._countries.length)
            return this.models

        try {
            const res = await axios.get<CountryAPIType[]>("https://restcountries.com/v3.1/all")
            this._countries = res.data
        } catch (error) {
            console.log("error fetching data: ", error)
        }

        return this.models
    }

    get models(): CountryModel[] {

        return this._countries.map(country => new CountryModel(country));

    }

    getCountryByCCa3(cca3: string): CountryModel | null {
        const country: CountryAPIType | undefined = this._countries.find(country => country.cca3 === cca3)
        if (country)
            return new CountryModel(country)
        return null
    }

    getCountryByName(name: string): CountryModel | null {
        if (!name.trim())
            return null
        const country: CountryAPIType | undefined = this._countries.find(country => country.name.official === name)
        if (country)
            return new CountryModel(country)
        return null
    }



}


// import axios, { AxiosResponse } from "axios";
// import { CountryAPIType } from "../context/CountryContext";
// // import { CountryAPIType } from "../context/CountryContext";
// // import { CountryRepoType } from "./CountryRespositoryType";


// export class CountryRepo {
//     private _countries: CountryAPIType[] = [];
//     constructor(setCountry:React.Dispatch<React.SetStateAction<CountryAPIType[]>>) {

//         void (async () => {
//             await this
//             .fetchCountries()
//             .then((countries) => setCountry(countries))
//             .catch(err => console.log("error setting countries",err))
//         })();
//     }

//     private async fetchCountries(): Promise<CountryAPIType[]> {
//         await axios.get<CountryAPIType[]>("https://restcountries.com/v3.1/all")
//             .then((res: AxiosResponse<CountryAPIType[]>) => this._countries = res.data)
//             .catch(err => console.log("error fetching countries ", err))

//         return this._countries;
//     }


//     public get countries(): CountryAPIType[] {
//         return this._countries;
//     }

// }

