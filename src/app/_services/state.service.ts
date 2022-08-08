import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class StateService {

    constructor(private http: HttpClient) { }

    getAllState()
    {
        return this.http.get(environment.apiUrl + 'state/all');
    }
}