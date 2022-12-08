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
  preloader:boolean  = true;
  preInloader:boolean  = true;
  MedInloader:boolean = true;
  inPreloader:boolean = true;
  inDoneloader : boolean = true;
  casePoloader : boolean = true;
  caseNoloader : boolean = true;
  caseConfirm:boolean = true;
  caseConfirmNot:boolean = true;
  caseWaiting:boolean = true;
 //displayStyle = "block";
  constructor(private userService:UserService,private dataService:DataService, private router: Router,) { }

  ngOnInit(): void {
  this.dashboardPre();
  }

  

  dashboardPre()
  {
    this.userService.getPreAnalysis().subscribe(
      data => {
        this.resultPre = data as any;
        this.preloader = false;
        this.dashboardPreDone();
      });
  }

  dashboardPreDone()
  {
    this.userService.getPreAnalysisDone().subscribe(
      data => {
        this.resultPreDone = data as any;
        this.preInloader = false;
        this.dashboardMediaIn();
      });
  }

  dashboardMediaIn()
  {
    this.userService.getMediaIn().subscribe(
      data => {
        this.resultMediaIn = data as any;
        this.MedInloader = false;
        this.dashboardAssessmentProcess();
      });
  }

  dashboardAssessmentProcess()
  {
    this.userService.getAssessmentProcess().subscribe(
      data => {
        this.resultAssProcess = data as any;
        this.inPreloader = false;
        this.dashboardAssessmentDone();
      });
  }

  dashboardAssessmentDone()
  {
    this.userService.getAssessmentDone().subscribe(
      data => {
        this.resultAssDone = data as any;
        this.inDoneloader = false;
        this.dashboardCasePossible();
      });
  }

  dashboardCasePossible()
  {
    this.userService.getCasePossible().subscribe(
      data => {
        this.resultCasePossible = data as any;
        this.casePoloader = false;
        this.dashboardCaseNotPossible();

      });
  }

  dashboardCaseNotPossible()
  {
    this.userService.getCasenotPossible().subscribe(
      data => {
        this.resultCaseNotPossible = data as any;
        this.caseNoloader = false;
        this.dashboardWaitingCase();
      });
  }

  dashboardWaitingCase()
  {
    this.userService.getWaitingCase().subscribe(
      data => {
        this.resultWaitCase = data as any;
        this.caseWaiting = false;
        this.dashboardConfirmCase();
      });
  }

  dashboardConfirmCase()
  {
    this.userService.getConfirmCase().subscribe(
      data => {
        this.resultConfirmCase = data as any;
        this.caseConfirm = false;
        this.dashboardConfirmNotCase();
      });
  }

  dashboardConfirmNotCase()
  {
    this.userService.getConfirmNotCase().subscribe(
      data => {
        this.resultConfirmNotCase = data as any;
        this.caseConfirmNot = false;
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
