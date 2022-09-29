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
    mediaCloneModel = "none";
    mediaSpareModel = "none";
    mediaCloneModelValue = [];
    mediaSpareModelValue = [];
    MediaCloneForm: FormGroup;
    MediaSpareForm: FormGroup;
    modelValue = [];
    mediaObj: any= [];
    caseType:boolean=false;
    raidMediaType:boolean;
    mediaLoading:boolean;
    constructor(private formBuilder: FormBuilder,
        private mediaInService: MediaInService,
        private router: Router,
        private _location: Location,
        private route: ActivatedRoute,
        private toastrService: ToastrService) {
        this.pageTitle = "Media Inspection";
     
    }
    ngOnInit(): void {
        this.mediaObj = AppUtil.getMediaDeatils() as any;
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
        this.MediaCloneForm = this.formBuilder.group({
            mediaCloneData: new FormArray([])
        });
        this.MediaSpareForm = this.formBuilder.group({
            mediaSpareData: new FormArray([])
        });
        this.mediaEdit = this.formBuilder.group({
            id: [''],
            case_type: ['',[Validators.required]],
            media_clone:[],            
            encryption_status:[],            
            encryption_type:[],            
            encryption_details_correct:[],
            compression_status:[],
            media_os:[],
            media_os_other:[],
            file_system_info:[],
            file_system_info_other:[],
            data_loss_reason:[],
            data_loss_reason_other:[],
            recoverable_data:[],
            recovery_possibility:[],
            recovery_percentage:[],
            required_days:[],
            stage:[],
            assessment_due_reason:[],
            remarks:['',[Validators.required]],
            media_damage:[],
            media_damage_physical:[],
            noise_type:[],
            drive_electronics:[],
            rotary_function:[],
            platters_condition:[],
            tampering_required:[],
            further_use:[],
            spare_required:[],
            media_received:[],
            media_condition:[],
            reading_process:[],
            state_identified:[],
            media_architecture:[],
            drive_count:[],
            total_drive:[],
            media_clone_detail:[],
            media_sapre_detail:[],
            damage_drive:[],
            media_damage_physical_serve:[],
            server_type:[], 
            media_group:[],
            //media_interface:[],
           // extension_required:[],
            //extension_day:[],
            //media_model:[],
            
 
            //media_ubi:[],
            //backup_software:[],
            //cloning_possibility:[],
            //disk_type:[],   
            //           
           
           });

           this.mediaInService.getMedia(this.route.snapshot.params['id']).subscribe(data => {
            this.mediaDetails = data as any;
            this.modelValue = this.mediaDetails['total_drive'];
            this.mediaCloneModelValue = this.mediaDetails['media_clone_detail'];
            this.mediaSpareModelValue = this.mediaDetails['media_sapre_detail'];
            this.modeltoForm(this.mediaDetails as any);
          });

          this.mediaEdit.get("case_type")?.valueChanges.subscribe(x => {
            if(x == 'Logical' || x=='Logical Complex')
            this.caseType= true;
            else
            this.caseType = false;
          });
           
    }

    appendOption(val, key) {
        let list = this.mediaObj[key].find(x => x === val);
        if (list == undefined) {
            if (val != null && val != '')
                this.mediaObj[key].push(val);
        }
    }

    modeltoForm(media)
    {
        if(media.media_type == 'RAID' || media.media_type == 'NVR Media' || media.media_type == 'Fusion Drive' || media.media_type == 'Fusion IO Drive')
        this.raidMediaType = true;
        this.appendOption(media.file_system_info, 'fileSystemInfo');
        this.appendOption(media.data_loss_reason, 'dataLossReason');
        this.appendOption(media.media_os, 'mediaOs');
        this.mediaEdit.setValue({
            id:media.id,
            case_type:media.case_type,
            media_clone:media.media_clone,
            encryption_status:media.encryption_status,
            encryption_type:media.encryption_type,
            encryption_details_correct:media.encryption_details_correct,
            media_os:media.media_os,
            media_os_other:'',
            compression_status:media.compression_status,
            file_system_info:media.file_system_info,
            file_system_info_other:'',
            data_loss_reason:media.data_loss_reason,
            data_loss_reason_other:'',
            recoverable_data:media.recoverable_data,
            recovery_possibility:media.recovery_possibility,
            recovery_percentage:media.recovery_percentage,
            required_days:media.required_days,
            stage:media.stage,
            assessment_due_reason:media.assessment_due_reason,
            remarks:"",
            media_damage:media.media_damage,
            media_damage_physical:media.media_damage_physical,
            noise_type:media.noise_type,
            drive_electronics:media.drive_electronics,
            rotary_function:media.rotary_function,
            platters_condition:media.platters_condition,
            tampering_required:media.tampering_required,
            further_use:media.further_use,
            spare_required:media.spare_required,
            media_received:media.media_received,
            media_condition:media.media_condition,
            reading_process:media.reading_process,
            state_identified:media.state_identified,
            media_architecture:media.media_architecture,
           // media_interface:media.media_interface,            
           // extension_required:media.extension_required,
           // extension_day:media.extension_day,        
            //media_model:media.media_model,
            drive_count:media.drive_count,            
           // media_ubi:media.media_ubi,
          //  backup_software:media.backup_software,
            //disk_type:media.disk_type,
            //cloning_possibility:media.cloning_possibility,
            server_type:media.server_type,            
            total_drive:'',
            media_clone_detail:'',
            media_sapre_detail:'',
            damage_drive:media.damage_drive,
            media_damage_physical_serve:media.media_damage_physical_serve,
            media_group:media.media_group,
        });

        this.mediaLoading = true;
        
    }

    onSubmit() {
        this.submitted = true;
        if (this.mediaEdit.invalid) {
            return false;
        }
         this.loading = true;
         let apiToCall: any;
         this.f['total_drive'].setValue(this.modelValue);
         this.f['media_clone_detail'].setValue(this.mediaCloneModelValue);
         this.f['media_sapre_detail'].setValue(this.mediaSpareModelValue);
         if (this.f['media_os'].value == 'Other') {
            this.f['media_os'].setValue(this.f['media_os_other'].value)
        }
        if (this.f['file_system_info'].value == 'Others') {
            this.f['file_system_info'].setValue(this.f['file_system_info_other'].value)
        }
        if (this.f['data_loss_reason'].value == 'Others') {
            this.f['data_loss_reason'].setValue(this.f['data_loss_reason_other'].value)
        }
         apiToCall = this.mediaInService.updateMediaAssessment(this.mediaEdit.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Saved successfully!', 'Success!',{timeOut: 3000});
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

    get fm() { return this.MediaCloneForm.controls; }
    get tm() { return this.fm['mediaCloneData'] as FormArray; }

    get fs() { return this.MediaSpareForm.controls; }
    get ts() { return this.fs['mediaSpareData'] as FormArray; }

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
                    media_condition: [(this.modelValue !=null && this.modelValue[i] !=undefined && this.modelValue[i]['media_condition']!=null)?this.modelValue[i]['media_condition']:''],
                    media_capacity: [(this.modelValue !=null && this.modelValue[i] !=undefined && this.modelValue[i]['media_capacity']!=null)?this.modelValue[i]['media_capacity']:''],
                    media_status: [(this.modelValue !=null && this.modelValue[i] !=undefined && this.modelValue[i]['media_status']!=null)?this.modelValue[i]['media_status']:'']
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

    saveMediaClone()
    {
        this.mediaCloneModelValue = this.fm['mediaCloneData'].value;
        this.mediaCloneModel = "none";
    }

    saveMediaSpare()
    {
        this.mediaSpareModelValue = this.fs['mediaSpareData'].value;
        this.mediaSpareModel = "none";
    }

    mediaClone()
    {
        this.MediaCloneForm.reset();
        this.tm.clear();
        this.addMediaClone();
        this.mediaCloneModel = "block";
    }

    mediaSpare()
    {
        this.MediaCloneForm.reset();
        this.ts.clear();
        this.addMediaSpare();
        this.mediaSpareModel = "block";
    }

    addMediaSpare() {
        const numberOfTickets =2;
        if (this.ts.length < numberOfTickets) {
            for (let i = this.ts.length; i < numberOfTickets; i++) {
                this.ts.push(this.formBuilder.group({
                    media_make: [(this.mediaSpareModelValue !=null && this.mediaSpareModelValue[i] !=undefined && this.mediaSpareModelValue[i]['media_make']!=null)?this.mediaSpareModelValue[i]['media_make']:''],
                    model_model: [(this.mediaSpareModelValue !=null && this.mediaSpareModelValue[i] !=undefined && this.mediaSpareModelValue[i]['model_model']!=null)?this.mediaSpareModelValue[i]['model_model']:''],
                    media_capacity: [(this.mediaSpareModelValue !=null && this.mediaSpareModelValue[i] !=undefined && this.mediaSpareModelValue[i]['media_capacity']!=null)?this.mediaSpareModelValue[i]['media_capacity']:''],
                    firmware: [(this.mediaSpareModelValue !=null && this.mediaSpareModelValue[i] !=undefined && this.mediaSpareModelValue[i]['firmware']!=null)?this.mediaSpareModelValue[i]['firmware']:''],
                    site_code: [(this.mediaSpareModelValue !=null && this.mediaSpareModelValue[i] !=undefined && this.mediaSpareModelValue[i]['site_code']!=null)?this.mediaSpareModelValue[i]['site_code']:''],
                    pcb_num: [(this.mediaSpareModelValue !=null && this.mediaSpareModelValue[i] !=undefined && this.mediaSpareModelValue[i]['pcb_num']!=null)?this.mediaSpareModelValue[i]['pcb_num']:''],
                }));               
        }      
        } 
    }

    addMediaClone() {
        const numberOfTickets =2;
        if (this.tm.length < numberOfTickets) {
            for (let i = this.tm.length; i < numberOfTickets; i++) {
                this.tm.push(this.formBuilder.group({
                    media_make: [(this.mediaCloneModelValue !=null && this.mediaCloneModelValue[i] !=undefined && this.mediaCloneModelValue[i]['media_make']!=null)?this.mediaCloneModelValue[i]['media_make']:''],
                    model_model: [(this.mediaCloneModelValue !=null && this.mediaCloneModelValue[i] !=undefined && this.mediaCloneModelValue[i]['model_model']!=null)?this.mediaCloneModelValue[i]['model_model']:''],
                    media_capacity: [(this.mediaCloneModelValue !=null && this.mediaCloneModelValue[i] !=undefined && this.mediaCloneModelValue[i]['media_capacity']!=null)?this.mediaCloneModelValue[i]['media_capacity']:''],
                    inventry_num: [(this.mediaCloneModelValue !=null && this.mediaCloneModelValue[i] !=undefined && this.mediaCloneModelValue[i]['inventry_num']!=null)?this.mediaCloneModelValue[i]['inventry_num']:'']
                }));               
        }      
        } 
    }

    dropDownChange(type)
    {
        if(type == 'spare' && this.f['spare_required'].value == 'Yes')
        this.mediaSpare();
        else if(type == 'clone' && this.f['media_clone'].value == 'Yes')
        this.mediaClone();

    }
}