import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { RegionsComponent } from './regions/regions.component';
import { CountrydetailsComponent } from './countrydetails/countrydetails.component';
import { addCountryListEuropeReducer } from './store/reducers/countryListEurope.reducer';
import { addCountryListAsiaReducer } from './store/reducers/countryListAsia.reducers';

@NgModule({
  declarations: [
    AppComponent,
    RegionsComponent,
    CountrydetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      EuropeanCountries: addCountryListEuropeReducer,
      AsianCountries: addCountryListAsiaReducer,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
