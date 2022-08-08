import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {RoleService} from './../../_services/role.service';

@Injectable()
export class RoleResolver implements Resolve<any> {

  constructor(private roleService:RoleService) { }

  resolve(): Observable<any> {
    return this.roleService.getAllRole();

  }
}