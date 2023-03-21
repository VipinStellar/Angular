import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppUtil } from 'src/app/_helpers/app.util';
import { RecoveryService } from './../../_services/recovery.service';
@Component({
    selector: 'app-recovery',
    templateUrl: './recovery.component.html',
})
export class RecoveryComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    recovery: FormGroup;
    caseNotPossibleObj:any =[];
    recoveryData:[];
    MediaCloneFormEny: FormGroup;
    MediaCloneFormEnyValue = [];
    MediaCloneFormRecver: FormGroup;
    MediaCloneFormRecverValue = [];
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private recoveryService:RecoveryService,
        private dialogRef: MatDialogRef<RecoveryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Recovery Process';
            this.recoveryService.fatchRecovery(this.data['media_id']).subscribe( data => {
                this.recoveryData = data as any;
                if(this.recoveryData['recoveryObj'] != null)
                {
                    this.MediaCloneFormEnyValue = this.recoveryData['recoveryObj'].clone_required_encrypted_data;
                    this.MediaCloneFormRecverValue = this.recoveryData['recoveryObj'].clone_required_recoverable_data;
                    this.modeltoForm(this.recoveryData);
                }
                this.addMediaClone();
                this.addMediaCloneRec();
              });
        }
    ngOnInit(): void {

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
            decryption_data_details:[],
            recoverable_data:[],
            clone_branch:[],
            clone_required_encrypted:[],
            clone_required_encrypted_data:[],
            clone_required_recoverable:[],
            clone_required_recoverable_data:[],
            remarks:['', [Validators.required]]
          });
          this.MediaCloneFormEny = this.formBuilder.group({
            mediaCloneData: new FormArray([])
        });
        this.MediaCloneFormRecver = this.formBuilder.group({
            mediaCloneDataRec: new FormArray([])
        });

          this.caseNotPossibleObj = AppUtil.caseNotPossible('Hard Drive');
    }

    get mce() { return this.MediaCloneFormEny.controls; }
    get tm() { return this.mce['mediaCloneData'] as FormArray; }

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
            decryption_data_details:rec['recoveryObj'].decryption_data_details,
            recoverable_data:rec['recoveryObj'].recoverable_data,
            clone_branch:rec['recoveryObj'].clone_branch,
            clone_required_encrypted:rec['recoveryObj'].clone_required_encrypted,
            clone_required_recoverable:rec['recoveryObj'].clone_required_recoverable,
            clone_required_encrypted_data:null,
            clone_required_recoverable_data:null,
            remarks:''
        });
    }

    get r() { return this.recovery.controls; }

    hide() {
        this.dialogRef.close();
        this.MediaCloneFormEny.reset();
        this.MediaCloneFormRecver.reset();
        this.tm.clear();
        this.trm.clear();
    }

    onSubmit() {
        this.submitted = true;
        if (this.recovery.invalid) {
            return false;
        }
        this.r['clone_required_encrypted_data'].setValue(this.tm.value);
        this.r['clone_required_recoverable_data'].setValue(this.trm.value);
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
}