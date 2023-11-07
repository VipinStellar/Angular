import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class RecoveryService {

    constructor(private http: HttpClient) { }

    fatchRecovery(id)
    {
        return this.http.get(environment.apiUrl + 'recovery/fatch-recovery/'+id);
    }

    fatchDirectory(id)
    {
        return this.http.get(environment.apiUrl + 'recovery/fatch-directory/'+id);
    }

    updateDirectory(data)
    {
        return this.http.post(environment.apiUrl + 'recovery/update-directory', data);
    }

    updateRecovery(data)
    {
        return this.http.post(environment.apiUrl + 'recovery/update', data);
    }

    deptUser(id)
    {
        return this.http.get(environment.apiUrl + 'recovery/dept-user/'+id);
    }

    updateAllotJob(data)
    {
        return this.http.post(environment.apiUrl + 'recovery/update-allot-job', data);
    }

    branchClone(data)
    {
        return this.http.post(environment.apiUrl + 'recovery/update-branch-clone-user', data);
    }

    requestExtension(data)
    {
        return this.http.post(environment.apiUrl + 'recovery/request-extension', data);
    }

    updateExtension(data)
    {
        return this.http.post(environment.apiUrl + 'recovery/update-extension', data);
    }

    updatePrice(data)
    {
        return this.http.post(environment.apiUrl + 'recovery/update-price', data);
    }

    addQuotation(data)
    {
        return this.http.post(environment.apiUrl + 'recovery/add-quotation', data);
    }

}