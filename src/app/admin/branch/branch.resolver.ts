import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {BranchService} from './../../_services/branch.service';

@Injectable()
export class BranchResolver implements Resolve<any> {

  constructor(private branchService:BranchService) { }

  resolve(): Observable<any> {
    return this.branchService.getAllBranch();

  }
}