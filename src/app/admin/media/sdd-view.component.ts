import { Component, OnInit, Inject ,Input} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
@Component({
    selector: 'sdd-view-details',
    templateUrl: './sdd-view.component.html',
})
export class SddViewDeatils implements OnInit {
    @Input('sddDetails') mediaDetails: any;
    ngOnInit(): void {
    }
}