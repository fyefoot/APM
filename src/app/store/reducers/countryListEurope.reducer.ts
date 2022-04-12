import { CountryListEurope } from '../models/countryListEurope.model';

export const ADD_EUROPEANCOUNTRIES = 'ADD_EUROPEANCOUNTRIES';

export function addCountryListEuropeReducer(state: CountryListEurope[] = [], action) {
  switch (action.type) {
    case ADD_EUROPEANCOUNTRIES:
      console.log('added european countries to the store');
      console.log(action.payload);
      return [...state, action.payload];
    default:
        return state;
    }
}
