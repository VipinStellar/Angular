import { Component, OnInit, Inject ,Input} from '@angular/core';
import { AccountService } from './../../_services/account.service';
import { AuthUser } from 'src/app/_models/authuser';
@Component({
    selector: 'flash-view-details',
    templateUrl: './flash-view.component.html',
})
export class flashViewDeatils implements OnInit {
    user: AuthUser;
    constructor(private accountService:AccountService) {}
    @Input('flashDetails') mediaDetails: any;
    ngOnInit(): void {
        if(this.mediaDetails['Directory_Listing'] !=null)
        this.mediaDetails['Directory_Listing']['data_recovered'] = JSON.parse(this.mediaDetails['Directory_Listing']['data_recovered']);
        this.user =  this.accountService.userValue;
    }
}