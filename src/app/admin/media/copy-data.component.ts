import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../_services/media.service';
@Component({
    selector: 'media-copy-data',
    templateUrl: './copy-data.component.html',
})
export class CopyDataComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    copydata: FormGroup;
    dataoutDetails: FormGroup;
    dataoutClone = [];
    disFieldName:boolean;
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private mediaService:MediaService,
        private dialogRef: MatDialogRef<CopyDataComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Data Out';
            if(data['copyin_details'] != null)
            this.dataoutClone = JSON.parse(data['copyin_details']);
            this.disFieldName = (data['reqType'] =='Tech')?false:true;
        }
    ngOnInit(): void {
        this.copydata = this.formBuilder.group({   
            id:[this.data['id']],            
            media_id:[this.data['media_id']], 
            copyin:[this.data['copyin']],
            data_copy_status:[this.data['data_copy_status']],
            data_out_mode:[this.data['data_out_mode']],
            ref_name:[this.data['ref_name']],
            ref_mobile:[this.data['ref_mobile']],
            id_proof:[this.data['id_proof']],
            ref_no:[this.data['ref_no']],
            reqType:[this.data['reqType']],
            courier_company_name:[this.data['courier_company_name']],
            courier_address:[this.data['courier_address']],
            address_same_as_mediain:[this.data['address_same_as_mediain']],
            copyin_details:[],
            remarks:['', [Validators.required]]
         });
         this.dataoutDetails = this.formBuilder.group({
            dataout: new FormArray([])
        });
        this.adddataout();
    }

    adddataout()
    {
        if(this.disFieldName)
        {
            this.copydata.controls['data_copy_status'].disable();
            this.copydata.controls['copyin'].disable();
        }
        const numberOfTickets = 1;
        if (this.formDteails.length < numberOfTickets) {
            for (let i = this.formDteails.length; i < numberOfTickets; i++) {
                this.formDteails.push(this.formBuilder.group({
                    media_sn: [(this.dataoutClone != null && this.dataoutClone[i] != undefined && this.dataoutClone[i]['media_sn'] != null) ? this.dataoutClone[i]['media_sn'] : ''],
                    media_model: [(this.dataoutClone != null && this.dataoutClone[i] != undefined && this.dataoutClone[i]['media_model'] != null) ? this.dataoutClone[i]['media_model'] : ''],
                    capacity: [(this.dataoutClone != null && this.dataoutClone[i] != undefined && this.dataoutClone[i]['capacity'] != null) ? this.dataoutClone[i]['capacity'] : ''],
                    media_make: [(this.dataoutClone != null && this.dataoutClone[i] != undefined && this.dataoutClone[i]['media_make'] != null) ? this.dataoutClone[i]['media_make'] : ''],
                    inventry_num: [(this.dataoutClone != null && this.dataoutClone[i] != undefined && this.dataoutClone[i]['inventry_num'] != null) ? this.dataoutClone[i]['inventry_num'] : ''],
                    cdSize: [(this.dataoutClone != null && this.dataoutClone[i] != undefined && this.dataoutClone[i]['cdSize'] != null) ? this.dataoutClone[i]['cdSize'] : '']
                }));
            }
        }
    }


    get copy() { return this.copydata.controls; }
    get formtails() { return this.dataoutDetails.controls; }
    get formDteails() { return this.formtails['dataout'] as FormArray; }
    
    onSubmit() {
        this.submitted = true;
        if (this.copydata.invalid) {
            return false;
        }
        this.copy['copyin_details'].setValue(this.formDteails.value);
         let apiToCall: any;
         apiToCall = this.mediaService.dataout(this.copydata.value);
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