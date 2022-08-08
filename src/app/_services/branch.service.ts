import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class BranchService {

    constructor(private http: HttpClient) { }

    getBranchList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'branch/branchlist', searchParams);
    }

    addBranch(data) {
        return this.http.post(environment.apiUrl + 'branch/add', data);
    }

    updateBranch(data) {
        return this.http.post(environment.apiUrl + 'branch/update', data);
    }

    getAllBranch()
    {
        return this.http.get(environment.apiUrl + 'branch/all');
    }
}