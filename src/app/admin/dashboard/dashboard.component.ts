import { Component, OnInit, Pipe } from '@angular/core';
import { UserService } from './../../_services/user.service';
import { DataService } from './../../_services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  pageTitle = "Dashboard";
  resultPre:any[];
  resultPreDone:any[];
  resultMediaIn:any[];
  resultAssProcess:any[];
  resultAssDone:any[];
  resultCasePossible:any[];
  resultCaseNotPossible:any[];
  resultConfirmCase:any[];
  resultConfirmNotCase:any[];
  resultWaitCase:any[];
  Object = Object;
 //displayStyle = "block";
  constructor(private userService:UserService,private dataService:DataService, private router: Router,) { }

  ngOnInit(): void {
  this.DashBaordCount();
  }

  

  DashBaordCount()
  {
    this.userService.DashBaordCount().subscribe(
      data => {
        data = data as any;
        this.resultPre = data['Pre'];
        this.resultPreDone =data['PreDone'];
        this.resultMediaIn =data['MediaIn'];
        this.resultAssProcess =data['AssInProcess'];
        this.resultAssDone =data['AssInDone'];
        this.resultCasePossible =data['casePossible'];
        this.resultCaseNotPossible =data['caseNotPossible'];
        this.resultWaitCase =data['countWait'];
        this.resultConfirmCase =data['countConfirm'];
        this.resultConfirmNotCase =data['countNotConfirm'];
      });
  }

  viewResult(val,type)
  {
    let arra = {'branch_id':val['branch_id'],"status":val['stage_id'],"user_id":val['user_id'],"type":type};
    this.dataService.setData('mediaSearch', arra);
    this.router.navigate(['admin/media']);
  }

  viewDtails(val)
  {
    let arra = {'branch_id':val['branch_id'],"status":val['stage_id']};
    this.dataService.setData('mediaSearch', arra);
    this.router.navigate(['admin/job-confirm']);
  }

  // openPopup() {
  //   this.displayStyle = "block";
  // }
  // closePopup() {
  //   this.displayStyle = "none";
  // }

}
