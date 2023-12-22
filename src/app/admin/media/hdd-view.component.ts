import { Component, OnInit, Inject ,Input} from '@angular/core';
import { AccountService } from './../../_services/account.service';
import { AuthUser } from 'src/app/_models/authuser';
@Component({
    selector: 'hdd-view-details',
    templateUrl: './hdd-view.component.html',
})
export class HddViewDeatils implements OnInit {
    user: AuthUser;
    constructor(private accountService:AccountService) {}
    @Input('hddDetails') mediaDetails: any;
    ngOnInit(): void {
        this.user =  this.accountService.userValue;
    }
}