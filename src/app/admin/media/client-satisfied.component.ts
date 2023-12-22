import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder , FormArray } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RecoveryService } from './../../_services/recovery.service';
@Component({
    selector: 'client-satisfied',
    templateUrl: './client-satisfied.component.html',
})
export class ClientSatisfiedComponent implements OnInit { 
    diaTitle: string;
    submitted: boolean;
    client: FormGroup;
    copymedia = [];
    copymediaDetails: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private recoveryService:RecoveryService,
        private dialogRef: MatDialogRef<ClientSatisfiedComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Directory Listing Confirmation';
            if(data['Directory_Listing']['copyin_details'] != null)
            this.copymedia = JSON.parse(data['Directory_Listing']['copyin_details']);

        }
    ngOnInit(): void {
        this.client = this.formBuilder.group({   
            id:[this.data['Directory_Listing']['id']],            
            media_id:[this.data['id']], 
            copyin_details:[],
            data_varification:[this.data['Directory_Listing']['data_varification']],
            data_varification_approval:[this.data['Directory_Listing']['data_varification_approval']],
            data_recovery_result:[this.data['Directory_Listing']['data_recovery_result']],
            dl_status:[this.data['Directory_Listing']['dl_status']],
            copyin:[this.data['Directory_Listing']['copyin']],
            peripheral_details:[this.data['Directory_Listing']['peripheral_details']],
            rework:[this.data['Directory_Listing']['rework']],
            remarks:['', [Validators.required]]
         });
         this.copymediaDetails = this.formBuilder.group({
            dataout: new FormArray([])
        });
        this.adddataout();
    }

    
    get cf() { return this.client.controls; }
    get copym() { return this.copymediaDetails.controls; }
    get formDteails() { return this.copym['dataout'] as FormArray; }

    adddataout()
    {
        const numberOfTickets = 1;
        if (this.formDteails.length < numberOfTickets) {
            for (let i = this.formDteails.length; i < numberOfTickets; i++) {
                this.formDteails.push(this.formBuilder.group({
                    media_sn: [(this.copymedia != null && this.copymedia[i] != undefined && this.copymedia[i]['media_sn'] != null) ? this.copymedia[i]['media_sn'] : ''],
                    media_model: [(this.copymedia != null && this.copymedia[i] != undefined && this.copymedia[i]['media_model'] != null) ? this.copymedia[i]['media_model'] : ''],
                    capacity: [(this.copymedia != null && this.copymedia[i] != undefined && this.copymedia[i]['capacity'] != null) ? this.copymedia[i]['capacity'] : ''],
                    media_make: [(this.copymedia != null && this.copymedia[i] != undefined && this.copymedia[i]['media_make'] != null) ? this.copymedia[i]['media_make'] : ''],
                    inventry_num: [(this.copymedia != null && this.copymedia[i] != undefined && this.copymedia[i]['inventry_num'] != null) ? this.copymedia[i]['inventry_num'] : ''],
                    cdSize: [(this.copymedia != null && this.copymedia[i] != undefined && this.copymedia[i]['cdSize'] != null) ? this.copymedia[i]['cdSize'] : '']
                }));
            }
        }
    }

    onSubmit() {
        this.submitted = true;
        if (this.client.invalid) {
            return false;
        }
        this.cf['copyin_details'].setValue(this.formDteails.value);
         let apiToCall: any;
         apiToCall = this.recoveryService.updateClientConformation(this.client.value);
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

    hide() {
        this.dialogRef.close();
    }
}