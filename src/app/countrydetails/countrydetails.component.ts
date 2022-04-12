import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'pm-countrydetails',
  templateUrl: './countrydetails.component.html',
  styleUrls: ['./countrydetails.component.css']
})
export class CountrydetailsComponent implements OnInit, OnChanges {
  @Input() country: any; // single country details passed as an object within an array

  constructor() { }

  title = 'Country Details';
  selectedCountryName = '';
  selectedCountryCapital = '';
  selectedCountryPopulation = '';
  selectedCountryCurrencies = '';
  selectedCountryFlag = '';

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {
    // console.log('Country component, the country \'' + this.country[0].name + '\' was selected OnChanges');

    this.selectedCountryName = this.country[0].name;
    this.selectedCountryCapital = this.country[0].capital;
    this.selectedCountryPopulation = this.country[0].population;
    this.selectedCountryCurrencies = this.country[0].currencies;
    this.selectedCountryFlag = this.country[0].flag;
  }

  ngOnInit() {
    // console.log('Country component, the country \'' + this.country[0].name + '\' was selected OnInit');
  }
}
