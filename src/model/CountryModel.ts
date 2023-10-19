import { CountryAPIType, FlagInfoType } from "../context/CountryContext";
import { container } from "../main";
import { CountryRepo } from "../repository/CountryRepository";


export class CountryModel {
    country: CountryAPIType;

    constructor(prop: CountryAPIType) {
        this.country = prop
    }

    get officialName(): string {
        return this.country.name.official
    }

    get commonName(): string {
        return this.country.name.common
    }

    get capital(): string {
        let capital = ""
        this.country.capital?.map((_capital, index) => {
            capital = _capital +
                ((this.country.capital.length - 1 != index)
                    ? ", "
                    : "")
        })
        return capital
    }

    get commonNativeName(): string {
        let nativeName = '';
        const iterable = this.country.name.nativeName

        if (iterable)
            Object.keys(iterable).map((key, index) => {
                nativeName += iterable[key].common;

                nativeName +=
                    Object.keys(iterable).length != index + 1 ? ", " : null;
            });
        return nativeName;
    }

    get flagInfo(): FlagInfoType {
        return this.country.flags
    }

    get population(): number {
        return this.country.population
    }

    get region(): string {
        return this.country.region
    }

    get borderCountries(): CountryModel[]  {
        const countries: CountryModel[] = []

        this.country.borders?.map((cca3: string) => {
            const country = container.resolve<CountryRepo>(CountryRepo.name).getCountryByCCa3(cca3)
            if (country)
                countries.push(country)
        })

        return countries
    }

    get subregion(): string {
        return this.country.subregion;
    }

    get currencies(): string {
        let currencies = "";
        const iterable = this.country.currencies

        if (iterable)
        Object.keys(iterable)?.map((el, key) => {
            currencies += iterable[el].name;

            currencies +=
                Object.keys(iterable).length != key + 1 ? ", " : "";
        });


        return currencies
    }

    get languages(): string {
        let languages = "";

        if (this.country.languages) {
            Object.keys(this.country.languages)?.map((el, key) => {
                languages += this.country.languages[el];

                languages +=
                    Object.keys(this.country.languages).length != key + 1 ? ", " : "";
            });
        }

        return languages
    }

    get tld() {
        let tld = "";

        this.country.tld?.map((el, index) => {
            tld += el +
                ((this.country.tld.length - 1 != index)
                    ? ", "
                    : ""
                )
        })

        return tld
    }

}