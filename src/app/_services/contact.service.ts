import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ContactService {

    constructor(private http: HttpClient) { }

    getcontactList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'contact/contact-list', searchParams);
    }
}