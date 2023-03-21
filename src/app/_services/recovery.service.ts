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

    updateExtension(data)
    {
        return this.http.post(environment.apiUrl + 'recovery/update-extension', data);
    }
}