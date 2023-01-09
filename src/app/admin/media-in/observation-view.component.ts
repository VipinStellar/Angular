import { Component, OnInit, Inject } from '@angular/core';
import { MediaIn } from 'src/app/_models/mediaIn';
import { MediaInService } from './../../_services/mediaIn.service';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
@Component({
    selector: 'app-observation',
    templateUrl: './observation-view.component.html',
})
export class ObservationView implements OnInit {
    pageTitle: string = "Pre Inspection";
    assignedRole: [];
    currentUrl: string;
    isAsscessDenied: boolean;
    isLoading: boolean;
    mediaDetails: MediaIn[] = [];
    tabItems = AppUtil.getMediaRecoveryTab();
    activeLink = this.tabItems[1];
    mediaEditHistory: [];
    constructor(private mediaInService: MediaInService,private router: Router, private route: ActivatedRoute,
                private accountService: AccountService) {}    
    ngOnInit(): void {
        this.assignedRole = this.route.snapshot.data['profileResolver'];
        this.currentUrl = this.router.url.split('/')[2];
        this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'access', this.currentUrl);
        if (!this.isAsscessDenied)
        this.router.navigate(['admin/access-denied']);
        this.getMediaDetails();
        this.getMediaEditHistory();
        
    }

    getMediaDetails()
    {
        this.mediaInService.getMedia(this.route.snapshot.params['id']).subscribe(data => {
            this.mediaDetails = data as any;
            this.isLoading = true;
          });
    }

    getMediaEditHistory() {
        this.mediaInService.mediaHistory(this.route.snapshot.params['id'], 'edit','observation').subscribe(data => {
          this.mediaEditHistory = data as any;
        });
      }

      editMediaIn()
      {
        this.router.navigate(['admin/observation/edit/'+this.mediaDetails['id']]);
      }

      onchangetab(item)
      {
        if(item == 'Media Daily Status')
        this.router.navigate(['admin/daily-status/'+this.mediaDetails['id']]);
        else if(item == 'Case Details')
        this.router.navigate(['admin/observation-details/'+this.mediaDetails['id']]);
        else
        this.router.navigate(['admin/observation/'+this.mediaDetails['id']]);
      }
}