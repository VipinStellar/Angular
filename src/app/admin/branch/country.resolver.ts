import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryService } from './../../_services/country.service';

@Injectable()
export class CountryResolver implements Resolve<any> {

  constructor(private countryService:CountryService) { }

  resolve(): Observable<any> {
    return this.countryService.getAllCountry();
  }
}