import { CountryListAsia } from '../models/countryListAsia.model';

export const ADD_ASIANCOUNTRIES = 'ADD_ASIANCOUNTRIES';

export function addCountryListAsiaReducer(state: CountryListAsia[] = [], action) {
  switch (action.type) {
    case ADD_ASIANCOUNTRIES:
      console.log('added asian countries to the store');
      console.log(action.payload);
      return [...state, action.payload];
    default:
        return state;
    }
}
