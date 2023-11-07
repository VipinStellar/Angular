import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CompanyService {

    constructor(private http: HttpClient) { }

    getcompanyList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'company/company-list', searchParams);
    }

    updateCompany(data) {
        return this.http.post(environment.apiUrl + 'company/update-company', data);
    }
}