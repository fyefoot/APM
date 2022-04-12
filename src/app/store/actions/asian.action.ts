import { Action } from '@ngrx/store';
import { CountryDetail } from '../models/countryDetail.model';


export enum AsianActionType {
  ADD_ASIAN = 'ADD_ASIAN',
  type = "type"
}

export class AddAsianItemAction implements Action {
  readonly type = AsianActionType.ADD_ASIAN;
  //add an optional payload
  constructor(public payload: CountryDetail) {}
}

export type AsianAction = AddAsianItemAction;