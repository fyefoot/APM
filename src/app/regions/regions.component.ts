import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app.state';
import { CountryListEurope } from '../store/models/countryListEurope.model';
import { CountryListAsia } from '../store/models/countryListAsia.model';

@Component({
  selector: 'pm-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {

  storeCountriesAsia: Observable<any>;
  storeCountriesEurope: Observable<any>;

  constructor(private httpService: CountriesService,
              private store: Store<AppState>) {
                this.storeCountriesAsia = this.store.select(state => state.AsianCountries);
                this.storeCountriesEurope = this.store.select(state => state.EuropeanCountries);
              }

  title = 'Region/Country selector';
  isCountryDisabled = true;
  isCountrySelected = false;
  countryListEurope: any; // from the store
  countryListAsia: any;

  selectedCountryName = '';
  selectedCountryCapital = '';
  selectedCountryPopulation = '';
  selectedCountryCurrencies = '';
  selectedCountryFlag = '';

  regionsList: Array<any> = [
    { name: 'Europe' },
    { name: 'Asia'}
  ];

  countries: any; // get this from the store
  selectedCountry: Array<any>;

  changeRegion(region: string) {

    if (region === 'Default') {
      this.changeCountry('Default');
    } else {
      console.log('European countries ' + this.countryListEurope); // empty first time
      console.log('Asian countries ' + this.countryListAsia); // empty first time

      if (region === 'Europe' && this.countryListEurope !== undefined) {
        console.log('Add existing europeancountries from store');
        // this.countries = this.countryListEurope;
        this.isCountrySelected = false;
        this.countryListEurope = this.storeCountriesEurope;
        this.countries = this.countryListEurope;
        this.isCountryDisabled = false;
      } else if (region === 'Asia' && this.countryListAsia !== undefined) {
        console.log('Add existing asian countries from store');
        // this.countries = this.countryListAsia;
        this.countryListAsia = this.storeCountriesAsia;
        this.countries = this.countryListAsia;
        this.isCountrySelected = false;
        this.isCountryDisabled = false;
      } else {
        console.log('Add countries to the store');
        // calls the http get on demand for a specified region
        this.httpService.getPosts(region).subscribe(
          (response) => {

              if (region === 'Europe') {
                // this.countryListEurope = response;

                this.store.dispatch({
                  type: 'ADD_EUROPEANCOUNTRIES',
                  payload: { EuropeanCountries: response } as CountryListEurope, });

                this.countryListEurope = this.storeCountriesEurope;
                this.countries = this.countryListEurope;
                console.log('store europe list = ' +  this.storeCountriesEurope);
              }

              if (region === 'Asia') {
                // this.countryListAsia = response;

                this.store.dispatch({
                  type: 'ADD_ASIANCOUNTRIES',
                  payload: { AsianCountries: response } as CountryListAsia, });

                this.countryListAsia = this.storeCountriesAsia;
                this.countries = this.countryListAsia;
                console.log('store asia list = ' +  this.storeCountriesAsia);
              }

              this.isCountryDisabled = (region === 'Default') ? true : false;
              this.isCountrySelected = false;
            },
          (error) => { console.log(error); });


      }
    }
  }

  changeCountry(country) {

    // find the selected country or leave undefined if default picked
    this.selectedCountry = this.countries.filter(reg => reg.name === country);

    if (country === 'Default') {
      this.countries = []; // empties the dropdown list and leaves the default message which is disabled
      this.isCountrySelected = false;
      this.isCountryDisabled = true;
    } else {
      this.isCountrySelected = true;
      this.isCountryDisabled = false;
    }
  }

  ngOnInit() {
  }

}
