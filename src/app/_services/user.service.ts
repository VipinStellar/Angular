import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient) { }

    addUser(data) {
        return this.http.post(environment.apiUrl + 'user/add', data);
    }

    getUserList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'user/userlist', searchParams);
    }
    deleteUser(id) {
        return this.http.get(environment.apiUrl + 'user/delete/' + id);
    }
    getAssignRole()
    {
        return this.http.get(environment.apiUrl + 'user/getrole');
    }

    getTeam()
    {
        return this.http.get(environment.apiUrl + 'user/getTeam');
    }

    logout(data)
    {
        return this.http.post(environment.apiUrl + 'auth/logout',data);
    }

    getSupervisor(roleId,branchId)
    {
        return this.http.get(environment.apiUrl + 'user/getSupervisor/'+roleId+'/'+branchId);
    }

    DashBaordCount()
    {
        return this.http.get(environment.apiUrl + 'user/DashBaordCount');
    }

    changePassword(data)
    {
        return this.http.post(environment.apiUrl + 'user/changePassword', data);
    }


}