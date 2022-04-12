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

    this.selectedCountryName = this.country[0].SelectedCountryName;
    this.selectedCountryCapital = this.country[0].SelectedCountryCapital;
    this.selectedCountryPopulation = this.country[0].SelectedCountryPopulation;
    this.selectedCountryCurrencies = this.country[0].SelectedCountryCurrencies;
    this.selectedCountryFlag = this.country[0].SelectedCountryFlag;
  }

  ngOnInit() {
  }
}
