import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MediaInService } from './../../_services/mediaIn.service';
import { ToastrService } from 'ngx-toastr';
import { MediaIn } from './../../_models/mediaIn';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppUtil } from 'src/app/_helpers/app.util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-media-assessment',
    templateUrl: './media-edit-assessment.component.html',
})
export class MediaAssessmentEdit implements OnInit {
    assignedRole: [];
    isAsscessDenied: boolean;
    pageTitle: string;
    submitted: boolean;
    loading: boolean;
    mediaDetails: MediaIn[] = [];
    stages: [];
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
    mediaObj: any = [];
    caseType: boolean = false;
    raidMediaType: boolean;
    mediaLoading: boolean;
    uploadUrl: string;
    selectedFiles?: FileList;
    dynamicButton:boolean;
    previewType:boolean = true;
    raidGroup: string[] = [];
    raidSRNo: string[] = [];
    errorMsg :string = 'Please fill all required fields *';
    @ViewChild('fileUploader') fileUploader:ElementRef;
    constructor(private formBuilder: FormBuilder,
        private mediaInService: MediaInService,
        private router: Router,
        private _location: Location,
        private route: ActivatedRoute,
        private http: HttpClient,
        private toastrService: ToastrService) {
        this.pageTitle = "Media Inspection";

    }
    ngOnInit(): void {
        this.uploadUrl = environment.apiUrl;
        this.mediaObj = AppUtil.getMediaDeatils() as any;
        this.assignedRole = this.route.snapshot.data['profileResolver'];
        this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'modify', "media-assessment");
        if (!this.isAsscessDenied)
            this.router.navigate(['admin/access-denied']);
        this.mediaInService.mediastatus('assessment').subscribe(data => {
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
            case_type: ['', [Validators.required]],
            media_clone: [],
            encryption_status: [],
            encryption_name: [],
            encryption_type: [],
            encryption_details_correct: [],
            compression_status: [],
            media_os: [],
            media_os_other: [],
            file_system_info: [],
            file_system_info_other: [],
            data_loss_reason: [],
            data_loss_reason_other: [],
            recoverable_data: [],
            recovery_possibility: [],
            recovery_percentage: [],
            required_days: [],
            stage: [],
            assessment_due_reason: [],
            remarks: ['', [Validators.required]],
            media_damage: [],
            media_damage_physical: [],
            noise_type: [],
            drive_electronics: [],
            rotary_function: [],
            platters_condition: [],
            tampering_required: [],
            further_use: [],
            spare_required: [],
            media_received: [],
            media_condition: [],
            reading_process: [],
            state_identified: [],
            media_architecture: [],
            drive_count: [],
            total_drive: [],
            media_clone_detail: [],
            media_sapre_detail: [],
            damage_drive: [],
            media_damage_physical_serve: [],
            server_type: [],
            media_group: [],
            extension_required: [],
            extension_day: [],
            backup_software:[],
            other_server_type:[],
            no_recovery_reason_other:[],
            no_recovery_reason:[],
            //media_interface:[],
            //media_model:[],
            //media_ubi:[],
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
            if(this.mediaDetails['tampered_status'] == 'Tampered')
            {
                this.mediaObj['casetype'].splice('Logical',1);
                this.mediaObj['casetype'].splice('Logical Complex',1);
            }
        });

        this.mediaEdit.get("case_type")?.valueChanges.subscribe(x => {
            if (x == 'Logical' || x == 'Logical Complex')
                this.caseType = true;
            else
                this.caseType = false;
        });

        this.mediaEdit.get("media_group")?.valueChanges.subscribe(x => {
            this.raidGropupChange();
        });

    }

    raidGropupChange()
    {
        this.raidGroup = [];
        var totalSize = this.f['media_group'].value;
        for (let n = 0; n < totalSize; ++n) {
            this.raidGroup.push("Group "+(n+1));
          }
    }

    appendOption(val, key) {
        let list = this.mediaObj[key].find(x => x === val);
        if (list == undefined) {
            if (val != null && val != '')
                this.mediaObj[key].push(val);
        }
    }

    modeltoForm(media) {
        if (media.media_type == 'RAID' || media.media_type == 'NVR Media' || media.media_type == 'Fusion Drive' || media.media_type == 'Fusion IO Drive')
            this.raidMediaType = true;
        this.appendOption(media.file_system_info, 'fileSystemInfo');
        this.appendOption(media.data_loss_reason, 'dataLossReason');
        this.appendOption(media.media_os, 'mediaOs');
        this.appendOption(media.server_type, 'serverType');
        this.mediaEdit.setValue({
            id: media.id,
            case_type: media.case_type,
            media_clone: media.media_clone,
            encryption_status: media.encryption_status,
            encryption_name: media.encryption_name,
            encryption_type: media.encryption_type,
            encryption_details_correct: media.encryption_details_correct,
            media_os: media.media_os,
            media_os_other: '',
            compression_status: media.compression_status,
            file_system_info: media.file_system_info,
            file_system_info_other: '',
            data_loss_reason: media.data_loss_reason,
            data_loss_reason_other: '',
            recoverable_data: media.recoverable_data,
            recovery_possibility: media.recovery_possibility,
            recovery_percentage: media.recovery_percentage,
            required_days: media.required_days,
            stage: media.stage,
            assessment_due_reason: media.assessment_due_reason,
            remarks: "",
            media_damage: media.media_damage,
            media_damage_physical: media.media_damage_physical,
            noise_type: media.noise_type,
            drive_electronics: media.drive_electronics,
            rotary_function: media.rotary_function,
            platters_condition: media.platters_condition,
            tampering_required: media.tampering_required,
            further_use: media.further_use,
            spare_required: media.spare_required,
            media_received: media.media_received,
            media_condition: media.media_condition,
            reading_process: media.reading_process,
            state_identified: media.state_identified,
            media_architecture: media.media_architecture,
            extension_required: media.extension_required,
            extension_day: media.extension_day,
            // media_interface:media.media_interface,            
            //        
            //media_model:media.media_model,
            drive_count: media.drive_count,
            // media_ubi:media.media_ubi,
            //disk_type:media.disk_type,
            //cloning_possibility:media.cloning_possibility,
            server_type: media.server_type,
            total_drive: '',
            media_clone_detail: '',
            media_sapre_detail: '',
            damage_drive: media.damage_drive,
            media_damage_physical_serve: media.media_damage_physical_serve,
            media_group: media.media_group,
            backup_software:media.backup_software,
            other_server_type:'',
            no_recovery_reason:JSON.parse(media.no_recovery_reason),
            no_recovery_reason_other:media.no_recovery_reason_other
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
        if (this.f['server_type'].value == 'Other') {
            this.f['server_type'].setValue(this.f['other_server_type'].value)
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
                this.toastrService.success('Details Saved successfully!', 'Success!', { timeOut: 3000 });
                this.router.navigate(['admin/media-assessment/' + this.mediaDetails['id']]);
            },
            error => {
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

    openPopup(type) {
        if(type== 1)
        this.previewType = false;
        else
        this.previewType = true;
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
                   model_number: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['model_number'] != null) ? this.modelValue[i]['model_number'] : '',[Validators.required]],
                    serial_number: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['serial_number'] != null) ? this.modelValue[i]['serial_number'] : '',[Validators.required]],
                    media_condition: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['media_condition'] != null) ? this.modelValue[i]['media_condition'] : '',[Validators.required]],
                    media_capacity: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['media_capacity'] != null) ? this.modelValue[i]['media_capacity'] : '',[Validators.required]],
                    media_status: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['media_status'] != null) ? this.modelValue[i]['media_status'] : '',[Validators.required]],
                    media_interface: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['media_interface'] != null) ? this.modelValue[i]['media_interface'] : '',[Validators.required]],
                    group: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['group'] != null) ? this.modelValue[i]['group'] : ''],
                    damage: [(this.modelValue != null && this.modelValue[i] != undefined && this.modelValue[i]['damage'] != null) ? this.modelValue[i]['damage'] : ''],
                }));
            }
        } else {
            for (let i = this.t.length; i >= numberOfTickets; i--) {
                this.t.removeAt(i);
            }
        }
    }

    modelClose()
    {
        this.f['drive_count'].setValue(this.mediaDetails['drive_count'])
        this.dynamicButton = false;
        this.mediaModel = "none";
    }

    modelSave() {
        this.dynamicButton = true;
        if (this.dynamicForm.invalid) {
            return false;
        }
        let srNo= [] as any;
        this.fd['tatalDrive'].value.forEach(opt => {const obj = {};obj[opt['serial_number']] = opt['serial_number'];srNo.push(opt['serial_number']);});
        const hasDuplicates = (arr) => arr.length !== new Set(arr).size;
        if(hasDuplicates(srNo))
        {
            this.errorMsg = "Duplicate Serial Number Not Allowed";
        }
        else{
            this.errorMsg = "Please fill all required fields *"
            this.dynamicButton = false;
            this.modelValue = this.fd['tatalDrive'].value;
            this.mediaModel = "none";
        }
    }

    saveMediaClone() {
        this.mediaCloneModelValue = this.fm['mediaCloneData'].value;
        this.mediaCloneModel = "none";
    }

    saveMediaSpare() {
        this.mediaSpareModelValue = this.fs['mediaSpareData'].value;
        this.mediaSpareModel = "none";
    }

    mediaClone() {
        this.MediaCloneForm.reset();
        this.tm.clear();
        this.getMediaSRNumner();
        this.addMediaClone();
        this.mediaCloneModel = "block";
    }

    mediaSpare() {
        this.MediaCloneForm.reset();
        this.ts.clear();
        this.addMediaSpare();
        this.mediaSpareModel = "block";
    }

    addMediaSpare() {
        const numberOfTickets = 2;
        if (this.ts.length < numberOfTickets) {
            for (let i = this.ts.length; i < numberOfTickets; i++) {
                this.ts.push(this.formBuilder.group({
                    media_make: [(this.mediaSpareModelValue != null && this.mediaSpareModelValue[i] != undefined && this.mediaSpareModelValue[i]['media_make'] != null) ? this.mediaSpareModelValue[i]['media_make'] : ''],
                    model_model: [(this.mediaSpareModelValue != null && this.mediaSpareModelValue[i] != undefined && this.mediaSpareModelValue[i]['model_model'] != null) ? this.mediaSpareModelValue[i]['model_model'] : ''],
                    media_capacity: [(this.mediaSpareModelValue != null && this.mediaSpareModelValue[i] != undefined && this.mediaSpareModelValue[i]['media_capacity'] != null) ? this.mediaSpareModelValue[i]['media_capacity'] : ''],
                    firmware: [(this.mediaSpareModelValue != null && this.mediaSpareModelValue[i] != undefined && this.mediaSpareModelValue[i]['firmware'] != null) ? this.mediaSpareModelValue[i]['firmware'] : ''],
                    site_code: [(this.mediaSpareModelValue != null && this.mediaSpareModelValue[i] != undefined && this.mediaSpareModelValue[i]['site_code'] != null) ? this.mediaSpareModelValue[i]['site_code'] : ''],
                    pcb_num: [(this.mediaSpareModelValue != null && this.mediaSpareModelValue[i] != undefined && this.mediaSpareModelValue[i]['pcb_num'] != null) ? this.mediaSpareModelValue[i]['pcb_num'] : ''],
                }));
            }
        }
    }

    addMediaClone() {
        const numberOfTickets = 2;
        if (this.tm.length < numberOfTickets) {
            for (let i = this.tm.length; i < numberOfTickets; i++) {
                this.tm.push(this.formBuilder.group({
                    client_media_make: [(this.mediaCloneModelValue != null && this.mediaCloneModelValue[i] != undefined && this.mediaCloneModelValue[i]['client_media_make'] != null) ? this.mediaCloneModelValue[i]['client_media_make'] : ''],
                    client_media_sn: [(this.mediaCloneModelValue != null && this.mediaCloneModelValue[i] != undefined && this.mediaCloneModelValue[i]['client_media_sn'] != null) ? this.mediaCloneModelValue[i]['client_media_sn'] : ''],
                    type_processing: [(this.mediaCloneModelValue != null && this.mediaCloneModelValue[i] != undefined && this.mediaCloneModelValue[i]['type_processing'] != null) ? this.mediaCloneModelValue[i]['type_processing'] : ''],
                    stellar_make: [(this.mediaCloneModelValue != null && this.mediaCloneModelValue[i] != undefined && this.mediaCloneModelValue[i]['stellar_make'] != null) ? this.mediaCloneModelValue[i]['stellar_make'] : ''],
                    stellar_media_sn: [(this.mediaCloneModelValue != null && this.mediaCloneModelValue[i] != undefined && this.mediaCloneModelValue[i]['stellar_media_sn'] != null) ? this.mediaCloneModelValue[i]['stellar_media_sn'] : ''],
                    inventry_num: [(this.mediaCloneModelValue != null && this.mediaCloneModelValue[i] != undefined && this.mediaCloneModelValue[i]['inventry_num'] != null) ? this.mediaCloneModelValue[i]['inventry_num'] : '']
                }));
            }
        }
    }

    dropDownChange(type) {
        if (type == 'spare' && (this.f['spare_required'].value == 'Received' || this.f['spare_required'].value == 'Available in Stellar Inventory' || this.f['spare_required'].value == 'Required From Customer'))
            this.mediaSpare();
        else if (type == 'clone' && this.f['media_clone'].value == 'Yes')
            this.mediaClone();

    }

    getMediaSRNumner()
    {
        this.raidSRNo = [];
        if(this.raidMediaType)
        {
            for (let i = 0; i < this.modelValue.length; i++) {
                if(this.modelValue[i]['serial_number'] != null)
                {
                    this.raidSRNo.push(this.modelValue[i]['serial_number']);
                }
            }
        }
        else
        {
            this.raidSRNo.push(this.mediaDetails['media_serial']);
        }
    }
    
    onSelectFile(event) {
        this.selectedFiles = event.target.files;
        let totalSize = 0;
        if (this.selectedFiles) 
        {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                totalSize = totalSize + this.selectedFiles[i]['size'];
                if(this.selectedFiles[i]['type'] != 'application/x-zip-compressed' && this.selectedFiles[i]['type'] != 'image/png' && this.selectedFiles[i]['type'] != 'image/jpeg')
                {
                    this.toastrService.error('Only  allow  JPG,PNG,ZIP', 'Error!', { timeOut: 10000 });
                    this.fileUploader.nativeElement.value = null;
                    this.selectedFiles = undefined;
                    return 
                }
            }
        }
        if(totalSize  > 4000000)
        {
         this.toastrService.error('File size should not be grater then 4Mb', 'Error!', { timeOut: 10000 });
         this.fileUploader.nativeElement.value = null;
        }

    }

    uploadFiles(): void {
        if (this.selectedFiles) {
              const formData = new FormData();
              formData.append('media_id', this.mediaDetails['id']);
            for (let i = 0; i < this.selectedFiles.length; i++) {
                formData.append('files', this.selectedFiles[i]);
                this.http.post(this.uploadUrl + 'media/upload', formData).subscribe(data => { this.mediaDetails
                    ['fileUpload'] =  data['data'];
                    //this.toastrService.success('File upload successfully!', 'Success!', { timeOut: 1000 });
                });
            }
            this.fileUploader.nativeElement.value = null;
            this.selectedFiles = undefined;
            
        }
    }

    deleteFile(file)
    {
        Swal.fire({
            title: 'Are you sure want to remove? ' + file.name,
            //text: 'You will not be able to recover this file!.',
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: 'Yes, go ahead.',
            cancelButtonText: 'No, let me think',
          }).then((result) => {
            if (result.value) {
              let apiToCall = this.mediaInService.deleteFile(file.id);
              apiToCall.subscribe(
                data => {
                  this.toastrService.success('File delete successfully!', 'Success!');
                  this.mediaDetails['fileUpload'] =  data['data'];
                 }
              );
            } 
          });
    }
}