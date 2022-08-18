import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MediaInService } from './../../_services/mediaIn.service';
import { ToastrService } from 'ngx-toastr';
import {MediaIn} from './../../_models/mediaIn';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppUtil } from 'src/app/_helpers/app.util';
@Component({
    selector: 'app-media-assessment',
    templateUrl: './media-edit-assessment.component.html',
})
export class MediaAssessmentEdit implements OnInit {
    assignedRole: [];
    isAsscessDenied: boolean;
    pageTitle: string;
    submitted: boolean;
    loading:boolean;
    mediaDetails:MediaIn[] = [];
    stages:[];
    public mediaEdit: FormGroup;
    dynamicForm: FormGroup;
    mediaModel = "none";
    modelValue = [];
    constructor(private formBuilder: FormBuilder,
        private mediaInService: MediaInService,
        private router: Router,
        private _location: Location,
        private route: ActivatedRoute,
        private toastrService: ToastrService) {
        this.pageTitle = "Media Inspection";
     
    }
    ngOnInit(): void {
        this.assignedRole = this.route.snapshot.data['profileResolver'];
        this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'modify', "media-assessment");
        if (!this.isAsscessDenied)
            this.router.navigate(['admin/access-denied']);
        this.mediaInService.mediastatus('assessment').subscribe( data => {
            this.stages = data as any;
          });
          this.dynamicForm = this.formBuilder.group({
            tatalDrive: new FormArray([])
        });
        this.mediaEdit = this.formBuilder.group({
            id: [''],
            case_type: ['',[Validators.required]],
            media_interface:[],
            encryption_status:[],
            encryption_type:[],
            encryption_details_correct:[],
            media_damage:[],
            noise_type:[],
            drive_electronics:[],
            rotary_function:[],
            platters_condition:[],
            tampering_required:[],
            further_use:[],
            recovery_possibility:[],
            recoverable_data:[],
            recovery_percentage:[],
            required_days:[],
            stage:[],
            assessment_due_reason:[],
            extension_required:[],
            extension_day:[],
            media_os:[],
            compression_status:[],
            file_system_info:[],
            data_loss_reason:[],
            media_model:[],
            drive_count:[],
            media_condition:[],
            media_ubi:[],
            backup_software:[],
            cloning_possibility:[],
            disk_type:[],
            reading_process:[],
            state_identified:[],
            server_type:[],
            remarks:['',[Validators.required]],
            total_drive:[],
           });

           this.mediaInService.getMedia(this.route.snapshot.params['id']).subscribe(data => {
            this.mediaDetails = data as any;
            this.modelValue = this.mediaDetails['total_drive'];
            this.modeltoForm(this.mediaDetails as any);
          });
           
    }

    modeltoForm(media)
    {
        this.mediaEdit.setValue({
            id:media.id,
            case_type:media.case_type,
            media_interface:media.media_interface,
            encryption_status:media.encryption_status,
            encryption_type:media.encryption_type,
            encryption_details_correct:media.encryption_details_correct,
            media_damage:media.media_damage,
            noise_type:media.noise_type,
            drive_electronics:media.drive_electronics,
            rotary_function:media.rotary_function,
            platters_condition:media.platters_condition,
            tampering_required:media.tampering_required,
            further_use:media.further_use,
            recovery_possibility:media.recovery_possibility,
            recoverable_data:media.recoverable_data,
            recovery_percentage:media.recovery_percentage,
            required_days:media.required_days,
            stage:media.stage,
            assessment_due_reason:media.assessment_due_reason,
            extension_required:media.extension_required,
            extension_day:media.extension_day,
            media_os:media.media_os,
            compression_status:media.compression_status,
            file_system_info:media.file_system_info,
            data_loss_reason:media.data_loss_reason,
            media_model:media.media_model,
            drive_count:media.drive_count,
            media_condition:media.media_condition,
            media_ubi:media.media_ubi,
            backup_software:media.backup_software,
            disk_type:media.disk_type,
            reading_process:media.reading_process,
            state_identified:media.state_identified,
            cloning_possibility:media.cloning_possibility,
            server_type:media.server_type,
            remarks:"",
            total_drive:'',
        });
        if(media['tampered_status'] == "Tampered Media")
        this.f['tampering_required'].setValue('Already Tampered');
        
    }

    onSubmit() {
        this.submitted = true;
        if (this.mediaEdit.invalid) {
            return false;
        }
         this.loading = true;
         let apiToCall: any;
         this.f['total_drive'].setValue(this.modelValue);
         apiToCall = this.mediaInService.updateMediaAssessment(this.mediaEdit.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Save successfully!', 'Success!',{timeOut: 3000});
                this.router.navigate(['admin/media-assessment/'+this.mediaDetails['id']]);
            },
            error=>{
                console.log(error)
            }
        );
    }

    hide() {
        this._location.back();
    }

    get f() { return this.mediaEdit.controls; }
    get fd() { return this.dynamicForm.controls; }
    get t() { return this.fd['tatalDrive'] as FormArray; }

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
                    model_number: [(this.modelValue !=null &&this.modelValue[i] !=undefined && this.modelValue[i]['model_number']!=null)?this.modelValue[i]['model_number']:''],
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