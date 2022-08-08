import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new BehaviorSubject('toggleSidebar');
	data = this.dataSource.asObservable();

	constructor() { }

	setData(key,value){
		this.data[key]=value;  		
	}
	getDataByKey(key){
		return this.data[key];
	}
	getData(){
		return this.data;
  }
}
