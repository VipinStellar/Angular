import { Component, OnInit, Inject } from '@angular/core';
import { MediaIn } from 'src/app/_models/mediaIn';
import { MediaInService } from './../../_services/mediaIn.service';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
@Component({
    selector: 'observation-details',
    templateUrl: './observation-details.component.html',
})
export class ObservationDetails implements OnInit {
    pageTitle: string = "Case Details"
    mediaDetails: MediaIn[] = [];
    tabItems = AppUtil.getMediaRecoveryTab();
    activeLink = this.tabItems[0];
    currentUrl: string;
    constructor(private mediaInService: MediaInService,private router: Router, private route: ActivatedRoute,
        private accountService: AccountService) {}  
    ngOnInit(): void {
        this.currentUrl = this.router.url.split('/')[2];
        this.getMediaDetails();
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

      getMediaDetails()
      {
          this.mediaInService.getObvertationDetails(this.route.snapshot.params['id']).subscribe(data => {
              this.mediaDetails = data as any;
            });
      }
}