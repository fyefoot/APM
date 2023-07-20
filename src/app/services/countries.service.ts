import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private url = '';

  constructor(private http: HttpClient) { }

  getPosts(region: string) {
    // see https://github.com/apilayer/restcountries
    // Africa, Americas, Asia, Europe, Oceania
    //if (region == 'Africa') { this.url = 'https://restcountries.com/v2/region/africa'; }
    //if (region == 'Americas') { this.url = 'https://restcountries.com/v2/region/americas'; }
    if (region === 'Asia') { this.url = 'https://restcountries.com/v2/region/asia'; }
    if (region === 'Europe') { this.url = 'https://restcountries.com/v2/region/europe'; }
    //if (region == 'Oceania') { this.url = 'https://restcountries.com/v2/region/oceania'; }
    const data = this.http.get(this.url, { observe: 'body', responseType: 'json' });
    return data;
  }
}
