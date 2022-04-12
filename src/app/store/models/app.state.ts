import { CountryListEurope } from './countryListEurope.model';
import { CountryListAsia } from './countryListAsia.model';
export interface AppState {
  readonly EuropeanCountries: CountryListEurope[];
  readonly AsianCountries: CountryListAsia[];
}
