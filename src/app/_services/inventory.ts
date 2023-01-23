import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class InventoryService {
    constructor(private http: HttpClient) { }

    getInventoryList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'inventory/inventory-list', searchParams);
    }

    updateInventory(data)
    {
        return this.http.post(environment.apiUrl + 'inventory/update', data);
    }

    fatchInventory(id)
    {
        return this.http.get(environment.apiUrl + 'inventory/fatch/'+id);
    }
}