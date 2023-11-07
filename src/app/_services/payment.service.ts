import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class PaymentService {

    constructor(private http: HttpClient) { }

    addPayment(data)
    {
        return this.http.post(environment.apiUrl + 'payment/add-payment', data);
    }

    getPaymentDetails(searchParams: any){
        return this.http.post(environment.apiUrl+'payment/list',searchParams);
    }
    
    generateInvoice(id){
        return this.http.get(environment.apiUrl + 'payment/generate-invoice/'+id);
    }

    updatePONumber(data)
    {
        return this.http.post(environment.apiUrl + 'payment/update-po-number', data);
    }

    generateIrn(id){
        return this.http.get(environment.apiUrl + 'payment/generate-irn/'+id);
    }
}