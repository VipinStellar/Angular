import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CreditService {

    constructor(private http: HttpClient) { }
 
    list(data)
    {
        return this.http.post(environment.apiUrl + 'receipt/list', data);
    }

    getDetails(type,id)
    {
        return this.http.get(environment.apiUrl + 'receipt/getreceipt/'+type+'/'+id);
    }

    receiptupdate(data)
    {
        return this.http.post(environment.apiUrl + 'receipt/update', data);
    }
}