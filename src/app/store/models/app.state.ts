import { CountryDetail } from './countryDetail.model';
export interface AppState {
  readonly EuropeanCountries: Array<CountryDetail>;
  readonly AsianCountries: Array<CountryDetail>;
}
