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
            this.disFieldName = (data['frontdisk_out_req'] ==1)?true:false;

        }
    ngOnInit(): void {
        this.copydata = this.formBuilder.group({   
            id:[this.data['id']],            
            media_id:[this.data['media_id']], 
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
        const numberOfTickets = 1;
        if (this.formDteails.length < numberOfTickets) {
            for (let i = this.formDteails.length; i < numberOfTickets; i++) {
                this.formDteails.push(this.formBuilder.group({
                    media_sn: [(this.dataoutClone != null && this.dataoutClone[i] != undefined && this.dataoutClone[i]['media_sn'] != null) ? this.dataoutClone[i]['media_sn'] : ''],
                    media_model: [(this.dataoutClone != null && this.dataoutClone[i] != undefined && this.dataoutClone[i]['media_model'] != null) ? this.dataoutClone[i]['media_model'] : ''],
                    capacity: [(this.dataoutClone != null && this.dataoutClone[i] != undefined && this.dataoutClone[i]['capacity'] != null) ? this.dataoutClone[i]['capacity'] : ''],
                    media_make: [(this.dataoutClone != null && this.dataoutClone[i] != undefined && this.dataoutClone[i]['media_make'] != null) ? this.dataoutClone[i]['media_make'] : ''],
                    inventry_num: [(this.dataoutClone != null && this.dataoutClone[i] != undefined && this.dataoutClone[i]['inventry_num'] != null) ? this.dataoutClone[i]['inventry_num'] : '']
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