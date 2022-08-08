import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaInService } from './../../_services/mediaIn.service';
import { ToastrService } from 'ngx-toastr';
import {MediaIn} from './../../_models/mediaIn';
@Component({
    selector: 'app-media-assessment',
    templateUrl: './media-edit-assessment.component.html',
})
export class MediaAssessmentEdit implements OnInit {

    diaTitle: string;
    submitted: boolean;
    loading:boolean;
    mediaDetails:MediaIn[] = [];
    stages:[];
    public mediaEdit: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private mediaInService: MediaInService,
        private toastrService: ToastrService,
        private dialogRef: MatDialogRef<MediaAssessmentEdit>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = "Media Inspection";
          this.mediaInService.mediastatus('assessment').subscribe( data => {
            this.stages = data as any;
          });
          this.mediaDetails = data;
    }
    ngOnInit(): void {
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
           });
           this.modeltoForm(this.data as any);
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
            remarks:""
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
         apiToCall = this.mediaInService.updateMediaAssessment(this.mediaEdit.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Save successfully!', 'Success!',{timeOut: 3000});
               // this.toastrService.success('Email has been Send', 'Success!',{timeOut: 3000});
            },
            error=>{
                console.log(error)
            }
        );
    }

    hide() {
        this.dialogRef.close();
    }

    get f() { return this.mediaEdit.controls; }
}