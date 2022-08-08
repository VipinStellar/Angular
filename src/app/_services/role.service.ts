import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class RoleService {

    constructor(private http: HttpClient) { }

    getRoleList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'role/rolelist', searchParams);
    }

    addRole(data) {
        return this.http.post(environment.apiUrl + 'role/add', data);
    }

    updateRole(data) {
        return this.http.post(environment.apiUrl + 'role/update', data);
    }

    getAllRole()
    {
        return this.http.get(environment.apiUrl + 'role/all');
    }

    getRole(id)
    {
        return this.http.get(environment.apiUrl + 'role/getrole/'+id);
    }
}