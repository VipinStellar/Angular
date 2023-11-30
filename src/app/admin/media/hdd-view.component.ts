import { Component, OnInit, Inject ,Input} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
@Component({
    selector: 'hdd-view-details',
    templateUrl: './hdd-view.component.html',
})
export class HddViewDeatils implements OnInit {
    @Input('hddDetails') mediaDetails: any;
    ngOnInit(): void {
    }
}