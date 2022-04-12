import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private url = '';

  constructor(private http: HttpClient) { }

  getPosts(region: string) {
    if (region === 'Europe') { this.url = 'https://restcountries.com/v2/region/europe'; }
    if (region === 'Asia') { this.url = 'https://restcountries.com/v2/region/asia'; }
    const data = this.http.get(this.url, { observe: 'body', responseType: 'json' });
    return data;
  }
}
