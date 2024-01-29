import { Component, OnInit, Inject ,Input} from '@angular/core';
import { AccountService } from './../../_services/account.service';
import { AuthUser } from 'src/app/_models/authuser';
@Component({
    selector: 'sdd-view-details',
    templateUrl: './sdd-view.component.html',
})
export class SddViewDeatils implements OnInit {
    user: AuthUser;
    constructor(private accountService:AccountService) {}
    @Input('sddDetails') mediaDetails: any;
    ngOnInit(): void {
        if(this.mediaDetails['Directory_Listing'] !=null)
        this.mediaDetails['Directory_Listing']['data_recovered'] = JSON.parse(this.mediaDetails['Directory_Listing']['data_recovered']);
        this.user =  this.accountService.userValue;
    }
}