import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CountryService {

    constructor(private http: HttpClient) { }

    getAllCountry()
    {
        return this.http.get(environment.apiUrl + 'country/all');
    }
}