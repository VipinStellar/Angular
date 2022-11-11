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
    mediaOption: any = []
    mediaSizeList: string[] = [];
    mediaSizeListOption: string[] = [];
    mediaFieldShow:boolean;
    constructor(private formBuilder: FormBuilder,
        private mediaInService: MediaInService,
        private router: Router,
        private _location: Location,
        private toastrService: ToastrService, private route: ActivatedRoute,) {

    }
    ngOnInit(): void {
        this.mediaOption = AppUtil.getMediaDeatils() as any;
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
            tampered_status: [],
            service_mode: [''],
            media_interface: [''],
            media_type: [''],
            media_model: [''],
            media_serial: [''],
            media_capacity: [''],
            media_condition: [''],
            peripherals_details: [''],
            stage: ['', [Validators.required]],
            remarks: ['', [Validators.required]],
            total_drive: [''],
            media_category: [''],
            media_status: [''],
            media_make_other: [],
            media_capacity_other: [],
            media_cat_other: [],
            model_storage:[],
        });
        this.mediaInService.getMedia(this.route.snapshot.params['id']).subscribe(data => {
            this.mediaDetails = data as any;
            this.modelValue = this.mediaDetails['total_drive'];
            this.modeltoForm(this.mediaDetails as any);
        });
        this.mediaEdit.get("media_category")?.valueChanges.subscribe(x => {
            if(x == 'Others')
                this.mediaEdit.get('media_cat_other')?.setValidators([Validators.required]);
                else
                this.mediaEdit.get('media_cat_other')?.clearValidators();
            this.mediaEdit.get('media_cat_other')?.updateValueAndValidity();
          });
          this.mediaEdit.get("media_capacity")?.valueChanges.subscribe(x => {
            if(x == 'Others')
                this.mediaEdit.get('media_capacity_other')?.setValidators([Validators.required]);
                else
                this.mediaEdit.get('media_capacity_other')?.clearValidators();
            this.mediaEdit.get('media_capacity_other')?.updateValueAndValidity();
          });
          this.mediaEdit.get("media_make")?.valueChanges.subscribe(x => {
            if(x == 'Others')
                this.mediaEdit.get('media_make_other')?.setValidators([Validators.required]);
                else
                this.mediaEdit.get('media_make_other')?.clearValidators();
            this.mediaEdit.get('media_make_other')?.updateValueAndValidity();
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
        if (this.f['media_make'].value == 'Others') {
            this.f['media_make'].setValue(this.f['media_make_other'].value)
        }
        if (this.f['media_capacity'].value == 'Others') {
            this.f['media_capacity'].setValue(this.f['media_capacity_other'].value)
        }
        if (this.f['media_category'].value == 'Others') {
            this.f['media_category'].setValue(this.f['media_cat_other'].value)
        }
        if (this.f['media_status'].value == 'Working')
            this.f['tampered_status'].setValue('Non Tampered');

        if (this.f['media_status'].value == 'Non Working' && this.f['media_condition'].value == 'Non Tampered') {
            this.f['tampered_status'].setValue('Non Tampered')
        }

        if (this.f['media_status'].value == 'Non Working' && this.f['media_condition'].value != 'Non Tampered') {
            this.f['tampered_status'].setValue('Tampered')
        }

        apiToCall = this.mediaInService.updatePreAnalysis(this.mediaEdit.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Saved successfully!', 'Success!', { timeOut: 3000 });
                this.router.navigate(['admin/pre-analysis/' + this.mediaDetails['id']]);

            },
            error => {
                console.log(error)
            }
        );
    }

    appendOption(val, key) {
        let list = this.mediaOption[key].find(x => x === val);
        if (list == undefined) {
            if (val != null && val != '')
                this.mediaOption[key].push(val);
        }
    }

    modeltoForm(media) {
        this.appendOption(media.media_make, 'media_make');
        this.appendOption(media.media_capacity, 'capacity');
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
            media_condition: media.media_condition,
            stage: media.stage,
            tampered_status: null,
            remarks: "",
            peripherals_details: media.peripherals_details,
            total_drive: '',
            media_category: media.media_category,
            media_status: media.media_status,
            media_make_other: '',
            media_capacity_other: '',
            media_cat_other: '',
            model_storage:media.model_storage,
        });
        this.mediaTypeChange();
        this.appendMediaCatOption();
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
                    model_number: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['model_number'] != null) ? this.modelValue[i]['model_number'] : ''],
                    serial_number: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['serial_number'] != null) ? this.modelValue[i]['serial_number'] : ''],
                    media_condition: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['media_condition'] != null) ? this.modelValue[i]['media_condition'] : ''],
                    media_capacity: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['media_capacity'] != null) ? this.modelValue[i]['media_capacity'] : ''],
                    media_status: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['media_status'] != null) ? this.modelValue[i]['media_status'] : '']
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
        for (let i = 0; i < this.modelValue.length; i++) {
            if (this.modelValue[i]['media_condition'] == 'Non Tampered')
                this.f['tampered_status'].setValue('Non Tampered')
            else if (this.modelValue[i]['media_condition'] != 'Non Tampered')
                this.f['tampered_status'].setValue('Tampered')
            else
                this.f['tampered_status'].setValue('Non Tampered')
        }
        this.mediaModel = "none";
    }

    mediaStatusChange() {
        if (this.f['media_status'].value == 'Working')
            this.mediaOption['condition'] = ['Non Tampered', 'Casing Tampered Media Non Tampered'];
        else
            this.mediaOption['condition'] = AppUtil.getmediaCondition();
    }

    mediaTypeChange() {
        let mediaType = this.f['media_type'].value;
        this.mediaFieldShow = AppUtil.CheckMediaTypeFields(mediaType);
        if(this.mediaFieldShow)
        this.mediaStatusChange();
        let media = AppUtil.getMediaSize();
        if (media[mediaType] == undefined)
            this.mediaSizeList = media['Other'] as any;
        else
            this.mediaSizeList = media[mediaType] as any;
        this.mediaSizeListOption = this.mediaSizeList;
    }

    appendMediaCatOption() {
        let mediaType = this.f['media_type'].value;
        let media = AppUtil.getMediaSize();
        let list: string | undefined
        if (media[mediaType] == undefined)
            list = media['Other'].find(x => x === this.f['media_category'].value);
        else
            list = media[mediaType].find(x => x === this.f['media_category'].value);
        if (list == undefined) {
            if (this.f['media_category'].value != null && this.f['media_category'].value != '') {
                this.mediaSizeList.push(this.f['media_category'].value);
            }

        }

    }

}