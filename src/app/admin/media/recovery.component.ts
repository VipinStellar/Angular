import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private recoveryService:RecoveryService,
        private dialogRef: MatDialogRef<RecoveryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Recovery Process';
            this.recoveryService.fatchRecovery(this.data['media_id']).subscribe( data => {
                this.recoveryData = data as any;
                if(this.recoveryData['recoveryObj'] != null)
                this.modeltoForm(this.recoveryData);
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
            remarks:['', [Validators.required]]
          });
          this.caseNotPossibleObj = AppUtil.caseNotPossible('Hard Drive');
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
            remarks:''
        });
    }

    get r() { return this.recovery.controls; }

    hide() {
        this.dialogRef.close();
    }

    onSubmit() {
        this.submitted = true;
        if (this.recovery.invalid) {
            return false;
        }
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