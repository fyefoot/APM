import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpService: CountriesService) { }

  title = 'Region/Country selector';
  isCountryDisabled = true;
  isCountrySelected = false;
  countryListEurope: any;
  countryListAsia: any;

  selectedCountryName = '';
  selectedCountryCapital = '';
  selectedCountryPopulation = '';
  selectedCountryCurrencies = '';
  selectedCountryFlag = '';

  regionList: Array<any> = [
    { name: 'Europe' },
    { name: 'Asia'}
  ];

  countries: any;
  selectedCountry: Array<any>;

  changeRegion(region: string) {

    this.isCountryDisabled = false;

    if (region === 'Default') {
      this.changeCountry('Default');
    } else {

      if (region === 'Europe' && this.countryListEurope !== undefined) {

        this.countries = this.countryListEurope;
        // this.countries = this.countryList.filter(reg => reg.region === region);
        this.isCountrySelected = false;
        // console.log('Region data returned is for \'' + this.countries[0].region + '\'');

      } else if (region === 'Asia' && this.countryListAsia !== undefined) {

        this.countries = this.countryListAsia;
        // this.countries = this.countryList.filter(reg => reg.region === region);
        this.isCountrySelected = false;
        // console.log('Region data returned is for \'' + this.countries[0].region + '\'');

      } else {

        // calls the http get on demand
        this.httpService.getPosts(region).subscribe(
          (response) => {
              if (region === 'Europe') { this.countryListEurope = response; this.countries = this.countryListEurope; }
              if (region === 'Asia') { this.countryListAsia = response; this.countries = this.countryListAsia; }

              this.isCountryDisabled = (region === 'Default') ? true : false;
              this.isCountrySelected = false;
            //  console.log('Region data returned is for \'' + this.countries[0].region + '\'');
            },
          (error) => { console.log(error); });
      }
    }
  }

  changeCountry(country) {
    this.selectedCountry = this.countries.filter(reg => reg.name === country); // find the selected country

    console.log(country);

    if (country === 'Default') {
      this.countries = []; // empties the dropdown list and leaves the default message which is disabled
      this.isCountrySelected = false;
      this.isCountryDisabled = true;
    } else {
      this.isCountrySelected = true;
      this.isCountryDisabled = false;

      this.selectedCountryName = this.selectedCountry[0].name;
      this.selectedCountryCapital = this.selectedCountry[0].capital;
      this.selectedCountryPopulation = this.selectedCountry[0].population;
      this.selectedCountryCurrencies = this.selectedCountry[0].currencies;
      this.selectedCountryFlag = this.selectedCountry[0].flag;
    }
  }

  ngOnInit() {
    // nothing to do here
  }
}
