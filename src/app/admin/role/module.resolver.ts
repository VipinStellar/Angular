import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ModuleService } from './../../_services/module.service';

@Injectable()
export class ModuleResolver implements Resolve<any> {

  constructor(private moduleService:ModuleService) { }

  resolve(): Observable<any> {
    return this.moduleService.getAllModule();

  }
}