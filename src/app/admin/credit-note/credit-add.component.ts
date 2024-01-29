import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { CreditService } from './../../_services/credit.service';
import { ToastrService } from 'ngx-toastr';
import { Credit } from 'src/app/_models/credit';
import { ActivatedRoute, Router } from '@angular/router';
import { Location ,formatDate} from '@angular/common';

@Component({
    selector: 'app-credit-add',
    templateUrl: './credit-add.component.html',
})
export class CreditAddComponenet implements OnInit {
    pageTitle: string;
    submitted: boolean;
    loading: boolean;
    credit: Credit[] = [];
    creditForm: FormGroup;
    constructor(private formBuilder: FormBuilder,
                private creditService: CreditService,
                private router: Router,
                private _location: Location,
                private toastrService: ToastrService, 
                private route: ActivatedRoute,) {

    }
    ngOnInit(): void {
        this.pageTitle = "Add Credit Note";
    }
}