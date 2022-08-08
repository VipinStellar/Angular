import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ModuleService {

    constructor(private http: HttpClient) { }

    getAllModule()
    {
        return this.http.get(environment.apiUrl + 'module/all');
    }
}