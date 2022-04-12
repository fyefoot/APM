import { Action } from '@ngrx/store';
import { CountryDetail } from '../models/countryDetail.model';
export enum EuropeanActionType {
  ADD_EUROPEAN = 'ADD_EUROPEAN',
}
export class AddEuropeanItemAction implements Action {
  readonly type = EuropeanActionType.ADD_EUROPEAN;
  //add an optional payload
  constructor(public payload: CountryDetail) {}
}
export type EuropeanAction = AddEuropeanItemAction;