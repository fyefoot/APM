import { CountryDetail } from '../models/CountryDetail.model';
import { EuropeanAction, EuropeanActionType } from '../actions/european.action';

export function addCountryListEuropeReducer(
  state: Array<CountryDetail> = [],
  action: EuropeanAction
)
{
  switch (action.type) {
    case EuropeanActionType.ADD_EUROPEAN:
      return [...state, action.payload];
    default:
      return state;
    }
}
