import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  constructor( private http:HttpClient ){ }
  getTemplates(searchParams: any){
    return this.http.post(environment.apiUrl+'template/list',searchParams);
  }
  addTemplate(data){
    return this.http.post(environment.apiUrl+'template/add',data);
  }
  getTemplateDetail(id){
    return this.http.get(environment.apiUrl+'template/detail/'+id);
  }
  deleteTemplate(id){
    return this.http.get(environment.apiUrl+'template/delete/'+id);
  }
}
