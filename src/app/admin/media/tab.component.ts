import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Media } from  './../../_models/media';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute } from '@angular/router';
import { AuthUser } from 'src/app/_models/authuser';
import { AccountService } from './../../_services/account.service';
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html'
})
export class TabComponent implements OnInit {
 tabItems =   AppUtil.MediaTab();
 activeLink:string;
  @Input() mediaDetails: Media;
  user: AuthUser;

  constructor(private activatedRoute: ActivatedRoute,private accountService:AccountService) { }

  ngOnInit() {
      this.activeLink = this.activatedRoute.snapshot.url.join().split(',')[1];
      this.user =  this.accountService.userValue;
      if(this.user['role_id'] == 10)
      {
        this.removeTab();
        this.tabItems.push({'name':'Recovery Charges','url':'recovery-charges'});
      }       
  }

  removeTab()
  { 
    let toremove= ["daily-status","allot-job","transfer-media"];
    Object.keys(toremove).forEach( (value) => {  
      let indexOfObject=this.tabItems.findIndex((object) => {
        return object.url === toremove[value];
        });
        if (indexOfObject !== -1) {
        this.tabItems.splice(indexOfObject, 1);
        }
    });
  }

}