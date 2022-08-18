import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MediaInService } from './../../_services/mediaIn.service';
import { ToastrService } from 'ngx-toastr';
import { MediaIn } from 'src/app/_models/mediaIn';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppUtil } from 'src/app/_helpers/app.util';
@Component({
    selector: 'app-media-edit',
    templateUrl: './media-edit.component.html',
})
export class MediaEdit implements OnInit {
    currentUrl: string;
    assignedRole: [];
    isAsscessDenied: boolean;
    pageTitle: string;
    submitted: boolean;
    loading: boolean;
    stages: [];
    mediaDetails: MediaIn[] = [];
    mediaEdit: FormGroup;
    dynamicForm: FormGroup;
    mediaModel = "none";
    modelValue = [];
    constructor(private formBuilder: FormBuilder,
        private mediaInService: MediaInService,
        private router: Router,
        private _location: Location,
        private toastrService: ToastrService, private route: ActivatedRoute,) {

    }
    ngOnInit(): void {
        this.assignedRole = this.route.snapshot.data['profileResolver'];
        this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'modify', "pre-analysis");
        if (!this.isAsscessDenied)
            this.router.navigate(['admin/access-denied']);
        this.pageTitle = "Pre Inspection";
        this.mediaInService.mediastatus('analysis').subscribe(data => {
            this.stages = data as any;
        });
        this.dynamicForm = this.formBuilder.group({
            tatalDrive: new FormArray([])
        });
        this.mediaEdit = this.formBuilder.group({
            id: [''],
            media_make: [''],
            service_type: [''],
            media_casing: [''],
            drive_count: [''],
            service_mode: [''],
            media_interface: [''],
            media_type: [''],
            media_model: [''],
            media_serial: [''],
            media_capacity: [''],
            tampered_status: [''],
            media_condition: [''],
            peripherals_details: [''],
            stage: ['', [Validators.required]],
            remarks: ['', [Validators.required]],
            total_drive:[''],
            media_size:[''],
        });
        this.mediaInService.getMedia(this.route.snapshot.params['id']).subscribe(data => {
            this.mediaDetails = data as any;
            this.modelValue = this.mediaDetails['total_drive'];
            this.modeltoForm(this.mediaDetails as any);
        });


    }

    get f() { return this.mediaEdit.controls; }
    get fd() { return this.dynamicForm.controls; }
    get t() { return this.fd['tatalDrive'] as FormArray; }

    onSubmit() {
        this.submitted = true;
        if (this.mediaEdit.invalid) {
            return false;
        }
        this.loading = true;
        let apiToCall: any;
        this.f['total_drive'].setValue(this.modelValue);
        apiToCall = this.mediaInService.updatePreAnalysis(this.mediaEdit.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Save successfully!', 'Success!', { timeOut: 3000 });
                this.router.navigate(['admin/pre-analysis/' + this.mediaDetails['id']]);

            },
            error => {
                console.log(error)
            }
        );
    }

    modeltoForm(media) {
        this.mediaEdit.setValue({
            id: media.id,
            media_type: media.media_type,
            drive_count: media.drive_count,
            media_interface: media.media_interface,
            media_casing: media.media_casing,
            service_mode: media.service_mode,
            service_type: media.service_type,
            media_make: media.media_make,
            media_model: media.media_model,
            media_serial: media.media_serial,
            media_capacity: media.media_capacity,
            tampered_status: media.tampered_status,
            media_condition: media.media_condition,
            stage: media.stage,
            remarks: "",
            peripherals_details: media.peripherals_details,
            total_drive:'',
            media_size:media.media_size
        });
    }

    hide() {
        this._location.back();
    }

    counter(i: number) {
        return new Array(i);
    }
    openPopup() { 
      this.dynamicForm.reset();
      this.t.clear();
      this.addmoer();
      this.mediaModel = "block";
    }
    addmoer() {
        const numberOfTickets = this.f['drive_count'].value || 0;
        if (this.t.length < numberOfTickets) {
            for (let i = this.t.length; i < numberOfTickets; i++) {
                this.t.push(this.formBuilder.group({
                    model_number: [(this.modelValue !=null && this.modelValue[i] !=undefined && this.modelValue[i]['model_number']!=null)?this.modelValue[i]['model_number']:''],
                    serial_number: [(this.modelValue !=null && this.modelValue[i] !=undefined && this.modelValue[i]['serial_number']!=null)?this.modelValue[i]['serial_number']:''],
                    media_condition: [(this.modelValue !=null && this.modelValue[i] !=undefined && this.modelValue[i]['media_condition']!=null)?this.modelValue[i]['media_condition']:'']
                }));               
        }      
        } else {
            for (let i = this.t.length; i >= numberOfTickets; i--) {
                this.t.removeAt(i);
            }
        }
    }

    modelSave() {
        this.modelValue = this.fd['tatalDrive'].value;
        this.mediaModel = "none";
    }

}