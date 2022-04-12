import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app.state';
import { CountryDetail } from '../store/models/countryDetail.model';
import { AddAsianItemAction } from '../store/actions/asian.action';
import { AddEuropeanItemAction } from '../store/actions/european.action';

@Component({
  selector: 'pm-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {

  storeCountriesAsia$: Observable<any>;
  storeCountriesEurope$: Observable<any>;

  constructor(private httpService: CountriesService,
              private store: Store<AppState>) {
                this.storeCountriesAsia$ = this.store.select(state => state.AsianCountries);
                this.storeCountriesEurope$ = this.store.select(state => state.EuropeanCountries);
              }

  title = 'Region/Country selector';
  isCountryDisabled = true;
  isCountrySelected = false;
  countryListEurope: any; // from the store
  countryListAsia: any;
  responseObj: any;

  selectedCountryName = '';
  selectedCountryCapital = '';
  selectedCountryPopulation = '';
  selectedCountryCurrencies = '';
  selectedCountryFlag = '';

  regionsList: Array<any> = [
    { name: 'Europe' },
    { name: 'Asia'}
  ];

  countries: any; // need to get this from the store
  selectedCountry: Array<any>;

  changeRegion(region: string) {

    this.isCountryDisabled = false;

    if (region === 'Default') {
      this.changeCountry('Default');
    } else {

      if (region === 'Europe' && this.countryListEurope !== undefined) {

        this.countries = this.countryListEurope;
        this.isCountrySelected = false;
        this.isCountryDisabled = false;
      } else if (region === 'Asia' && this.countryListAsia !== undefined) {

        this.countries = this.countryListAsia;
        this.isCountrySelected = false;
        this.isCountryDisabled = false;
      } else {

        // calls the http get on demand for a specified region
        this.httpService.getPosts(region).subscribe(
          (response) => {

            this.responseObj = response as CountryDetail;

            let obj: CountryDetail;
            
            for (let x = 0; x < this.responseObj.length; x ++) {
              obj = {
                SelectedCountryName: this.responseObj[x].name,
                SelectedCountryCapital: this.responseObj[x].capital,
                SelectedCountryPopulation: this.responseObj[x].population,
                SelectedCountryCurrencies: this.responseObj[x].currencies,
                SelectedCountryFlag: this.responseObj[x].flags.png
              } 

              if (region === 'Europe') {
                this.store.dispatch(new AddEuropeanItemAction(obj as CountryDetail));
              }

              if (region === 'Asia') {
                this.store.dispatch(new AddAsianItemAction(obj as CountryDetail));
              }
            }

            if (region === 'Europe') {

              let obj = [];
              this.storeCountriesEurope$.forEach(element => {
                // only expecting one item containing the data list
                obj = element;
              });

              this.countryListEurope = [];
              for (let x = 0; x < obj.length; x++) {
                this.countryListEurope.push(obj[x]);
              }

              // this.countryListEurope = this.storeCountriesEurope$;
              this.countries = this.countryListEurope;
              console.log('Added European countries to the store');
            }

            if (region === 'Asia') {

              let obj = [];
              this.storeCountriesAsia$.forEach(element => {
                // only expecting one item containing the data list
                obj = element;
              });
              
              this.countryListAsia = [];
              for (let x = 0; x < obj.length; x++) {
                this.countryListAsia.push(obj[x]);
              }

              // this.countryListAsia = this.storeCountriesAsia$;
              this.countries = this.countryListAsia;
              console.log('Added Asian countries to the store');
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

    if (country === 'Default') {
      this.countries = []; // empties the dropdown list and leaves the default message which is disabled
      this.isCountrySelected = false;
      this.isCountryDisabled = true;
    } else {
      this.selectedCountry = this.countries.filter(reg => reg.SelectedCountryName === country);
      this.isCountrySelected = true;
      this.isCountryDisabled = false;
    }
  }

  ngOnInit() {
  }
}
