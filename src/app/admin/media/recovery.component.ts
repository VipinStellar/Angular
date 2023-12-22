import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppUtil } from 'src/app/_helpers/app.util';
import { RecoveryService } from './../../_services/recovery.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from './../../../environments/environment';
import { MediaService } from './../../_services/media.service';
@Component({
    selector: 'app-recovery',
    templateUrl: './recovery.component.html',
})
export class RecoveryComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    recovery: FormGroup;
    caseNotPossibleObj:any =[];
    partialObj:any =[];
    recoveryData:[];
    MediaCloneFormEny: FormGroup;
    MediaCloneFormEnyValue = [];
    MediaCloneFormValue = [];
    MediaCloneFormRecver: FormGroup;
    MediaCloneFormRecverValue = [];
    MediaCloneForm:FormGroup;
    @ViewChild('fileUploader') fileUploader:ElementRef;
    uploadUrl: string;
    errorMsg :string = 'Please fill all required fields *';
    selectedFiles?: FileList;
    uploadedFile:[];
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private recoveryService:RecoveryService,
        private http: HttpClient,
        private mediaService: MediaService,
        private dialogRef: MatDialogRef<RecoveryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Recovery Process';
            this.recoveryService.fatchRecovery(this.data['media_id']).subscribe( data => {
                this.recoveryData = data as any;
                this.uploadedFile = this.recoveryData['fileUpload'];
                let mediaType = AppUtil.checkMediaType(this.recoveryData['media_type']);
                if(this.recoveryData['caseType'] == 'Logical' || this.recoveryData['caseType'] == 'Logical Complex' || this.recoveryData['caseType']=='Most Complex')
                this.caseNotPossibleObj = AppUtil.caseNotPossible('Other');
                else
                this.caseNotPossibleObj = AppUtil.caseNotPossible(mediaType);

                this.partialObj = AppUtil.partialReason(this.recoveryData['media_type']);
                if(this.recoveryData['recoveryObj'] != null)
                {
                    this.MediaCloneFormValue = this.recoveryData['recoveryObj'].clone_required;
                    this.MediaCloneFormEnyValue = this.recoveryData['recoveryObj'].clone_required_encrypted_data;
                    this.MediaCloneFormRecverValue = this.recoveryData['recoveryObj'].clone_required_recoverable_data;
                    this.modeltoForm(this.recoveryData);
                }
                this.addMediaClone();
                this.addMediaCloneCreate();
                this.addMediaCloneRec();
              });
        }
    ngOnInit(): void {
        this.uploadUrl = environment.apiUrl;
        this.recovery = this.formBuilder.group({
            id:[],            
            media_id:[this.data['media_id']],            
            clone_creation: [],
            type: [this.data['type']],
            cloned_done: [],
            cloned_sectors:[],
            no_recovery_reason:[],
            no_recovery_reason_other:[],
            data_encrypted:[],
            decryption_details:[],
            decryption_details_send:[],
            decryption_data:[],
            recoverable_data:[],
            clone_branch:[],
            clone_required_encrypted:[],
            clone_required_encrypted_data:[],
            clone_required_recoverable:[],
            clone_required_recoverable_data:[],
            clone_required:[],
            start_date:[],
            end_date:[],
            partial_reason:[],
            partial_reason_other:[],
            shared_with_branch:[],
            remarks:['', [Validators.required]]
          });
          this.MediaCloneFormEny = this.formBuilder.group({
            mediaCloneData: new FormArray([])
        });
        this.MediaCloneFormRecver = this.formBuilder.group({
            mediaCloneDataRec: new FormArray([])
        });
        this.MediaCloneForm = this.formBuilder.group({
            mediaClone: new FormArray([])
        });

        this.recovery.get("decryption_details")?.valueChanges.subscribe(x => {
                this.r['decryption_data'].reset();
                this.r['decryption_details_send'].reset();
          });

    }

    get mce() { return this.MediaCloneFormEny.controls; }
    get tm() { return this.mce['mediaCloneData'] as FormArray; }

    get mc() { return this.MediaCloneForm.controls; }
    get tc() { return this.mc['mediaClone'] as FormArray; }

    addMediaCloneCreate() {
        const numberOfTickets = 2;
        if (this.tc.length < numberOfTickets) {
            for (let i = this.tc.length; i < numberOfTickets; i++) {
                this.tc.push(this.formBuilder.group({
                    client_media_sn: [(this.MediaCloneFormValue != null && this.MediaCloneFormValue[i] != undefined && this.MediaCloneFormValue[i]['client_media_sn'] != null) ? this.MediaCloneFormValue[i]['client_media_sn'] : ''],
                    type_processing: [(this.MediaCloneFormValue != null && this.MediaCloneFormValue[i] != undefined && this.MediaCloneFormValue[i]['type_processing'] != null) ? this.MediaCloneFormValue[i]['type_processing'] : ''],
                    stellar_make: [(this.MediaCloneFormValue != null && this.MediaCloneFormValue[i] != undefined && this.MediaCloneFormValue[i]['stellar_make'] != null) ? this.MediaCloneFormValue[i]['stellar_make'] : ''],
                    stellar_media_sn: [(this.MediaCloneFormValue != null && this.MediaCloneFormValue[i] != undefined && this.MediaCloneFormValue[i]['stellar_media_sn'] != null) ? this.MediaCloneFormValue[i]['stellar_media_sn'] : ''],
                    inventry_num: [(this.MediaCloneFormValue != null && this.MediaCloneFormValue[i] != undefined && this.MediaCloneFormValue[i]['inventry_num'] != null) ? this.MediaCloneFormValue[i]['inventry_num'] : '']
                }));
            }
        }
    }

    addMediaClone() {
        const numberOfTickets = 2;
        if (this.tm.length < numberOfTickets) {
            for (let i = this.tm.length; i < numberOfTickets; i++) {
                this.tm.push(this.formBuilder.group({
                    client_media_sn: [(this.MediaCloneFormEnyValue != null && this.MediaCloneFormEnyValue[i] != undefined && this.MediaCloneFormEnyValue[i]['client_media_sn'] != null) ? this.MediaCloneFormEnyValue[i]['client_media_sn'] : ''],
                    type_processing: [(this.MediaCloneFormEnyValue != null && this.MediaCloneFormEnyValue[i] != undefined && this.MediaCloneFormEnyValue[i]['type_processing'] != null) ? this.MediaCloneFormEnyValue[i]['type_processing'] : ''],
                    stellar_make: [(this.MediaCloneFormEnyValue != null && this.MediaCloneFormEnyValue[i] != undefined && this.MediaCloneFormEnyValue[i]['stellar_make'] != null) ? this.MediaCloneFormEnyValue[i]['stellar_make'] : ''],
                    stellar_media_sn: [(this.MediaCloneFormEnyValue != null && this.MediaCloneFormEnyValue[i] != undefined && this.MediaCloneFormEnyValue[i]['stellar_media_sn'] != null) ? this.MediaCloneFormEnyValue[i]['stellar_media_sn'] : ''],
                    inventry_num: [(this.MediaCloneFormEnyValue != null && this.MediaCloneFormEnyValue[i] != undefined && this.MediaCloneFormEnyValue[i]['inventry_num'] != null) ? this.MediaCloneFormEnyValue[i]['inventry_num'] : '']
                }));
            }
        }
    }

    get mre() { return this.MediaCloneFormRecver.controls; }
    get trm() { return this.mre['mediaCloneDataRec'] as FormArray; }

    addMediaCloneRec() {
        const numberOfTickets = 2;
        if (this.trm.length < numberOfTickets) {
            for (let i = this.trm.length; i < numberOfTickets; i++) {
                this.trm.push(this.formBuilder.group({
                    client_media_sn: [(this.MediaCloneFormRecverValue != null && this.MediaCloneFormRecverValue[i] != undefined && this.MediaCloneFormRecverValue[i]['client_media_sn'] != null) ? this.MediaCloneFormRecverValue[i]['client_media_sn'] : ''],
                    type_processing: [(this.MediaCloneFormRecverValue != null && this.MediaCloneFormRecverValue[i] != undefined && this.MediaCloneFormRecverValue[i]['type_processing'] != null) ? this.MediaCloneFormRecverValue[i]['type_processing'] : ''],
                    stellar_make: [(this.MediaCloneFormRecverValue != null && this.MediaCloneFormRecverValue[i] != undefined && this.MediaCloneFormRecverValue[i]['stellar_make'] != null) ? this.MediaCloneFormRecverValue[i]['stellar_make'] : ''],
                    stellar_media_sn: [(this.MediaCloneFormRecverValue != null && this.MediaCloneFormRecverValue[i] != undefined && this.MediaCloneFormRecverValue[i]['stellar_media_sn'] != null) ? this.MediaCloneFormRecverValue[i]['stellar_media_sn'] : ''],
                    inventry_num: [(this.MediaCloneFormRecverValue != null && this.MediaCloneFormRecverValue[i] != undefined && this.MediaCloneFormRecverValue[i]['inventry_num'] != null) ? this.MediaCloneFormRecverValue[i]['inventry_num'] : '']
                }));
            }
        }
    }

    modeltoForm(rec)
    {
        this.recovery.setValue({
            id:rec['recoveryObj'].id,
            media_id:rec.id,
            clone_creation:rec['recoveryObj'].clone_creation,
            type: this.data['type'],
            cloned_done:rec['recoveryObj'].cloned_done,
            cloned_sectors:rec['recoveryObj'].cloned_sectors,
            no_recovery_reason:JSON.parse(rec.no_recovery_reason),
            no_recovery_reason_other:rec.no_recovery_reason_other,
            data_encrypted:rec['recoveryObj'].data_encrypted,
            decryption_details:rec['recoveryObj'].decryption_details,
            decryption_details_send:rec['recoveryObj'].decryption_details_send,
            decryption_data:rec['recoveryObj'].decryption_data,
            recoverable_data:rec['recoveryObj'].recoverable_data,
            clone_branch:rec['recoveryObj'].clone_branch,
            clone_required_encrypted:rec['recoveryObj'].clone_required_encrypted,
            clone_required_recoverable:rec['recoveryObj'].clone_required_recoverable,
            clone_required_encrypted_data:null,
            clone_required_recoverable_data:null,
            clone_required:null,
            end_date:rec['recoveryObj'].end_date,
            start_date:rec['recoveryObj'].start_date,
            partial_reason:rec['recoveryObj'].partial_reason,
            shared_with_branch:rec['recoveryObj'].shared_with_branch,
            partial_reason_other:rec['recoveryObj'].partial_reason_other,
            remarks:''
        });
    }

    get r() { return this.recovery.controls; }

    hide() {
        this.dialogRef.close();
        this.MediaCloneFormEny.reset();
        this.MediaCloneForm.reset();
        this.MediaCloneFormRecver.reset();
        this.tm.clear();
        this.tc.clear();
        this.trm.clear();
    }

    onSubmit() {
        this.submitted = true;
        if (this.recovery.invalid) {
            return false;
        }
        this.r['clone_required_encrypted_data'].setValue(this.tm.value);
        this.r['clone_required_recoverable_data'].setValue(this.trm.value);
        this.r['clone_required'].setValue(this.tc.value);
         let apiToCall: any;
         apiToCall = this.recoveryService.updateRecovery(this.recovery.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Saved successfully!', 'Success!');
            },
            error=>{
                console.log(error)
            }
        );
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
                    this.toastrService.error('Only  allow  JPG,PNG,ZIP', 'Error!');
                    this.fileUploader.nativeElement.value = null;
                    this.selectedFiles = undefined;
                    return 
                }
            }
        }
        if(totalSize  > 4000000)
        {
         this.toastrService.error('File size should not be grater then 4Mb', 'Error!');
         this.fileUploader.nativeElement.value = null;
         this.selectedFiles = undefined;
        }

    }

    uploadFiles(): void {
        if (this.selectedFiles) {
              const formData = new FormData();
              formData.append('media_id', this.data['media_id']);
            for (let i = 0; i < this.selectedFiles.length; i++) {
                formData.append('files', this.selectedFiles[i]);
                formData.append('type', 'recovery');
                this.http.post(this.uploadUrl + 'media/upload', formData).subscribe(data => { this.uploadedFile=  data['data'];
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
              let apiToCall = this.mediaService.deleteFile(file.id);
              apiToCall.subscribe(
                data => {
                  this.toastrService.success('File delete successfully!', 'Success!');
                  this.uploadedFile =  data['data'];
                 }
              );
            } 
          });
    }

}