import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from './../../_services/state.service';

@Injectable()
export class StateResolver implements Resolve<any> {

  constructor(private stateService:StateService) { }

  resolve(): Observable<any> {
    return this.stateService.getAllState();
  }
}