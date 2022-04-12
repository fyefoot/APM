import { CountryDetail } from '../models/CountryDetail.model';
import { AsianAction, AsianActionType } from '../actions/asian.action';

export function addCountryListAsiaReducer(
  state: CountryDetail[] = [],
  action: AsianAction
) {
  switch (action.type) {
    case AsianActionType.ADD_ASIAN:
      return [...state, action.payload];
    default:
      return state;
    }
}
