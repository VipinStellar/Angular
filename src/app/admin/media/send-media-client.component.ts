import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../_services/media.service';
@Component({
    selector: 'app-request-media-client',
    templateUrl: './send-media-client.component.html',
})
export class SendMediaClient implements OnInit {
    diaTitle: string;
    submitted: boolean;
    mediaout: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private mediaService:MediaService,
        private dialogRef: MatDialogRef<SendMediaClient>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Send Media Out  For Client';
        }
    ngOnInit(): void {
        this.mediaout = this.formBuilder.group({ 
            media_id:[this.data['id']],            
            media_out_Type: [],
            media_out_mode: [],
            courier_company_name: [],
            same_as_address: [],
            ref_no: [],
            ref_name: [],
            ref_mobile: [],
            id_proof: [],
            courier_address: [],
            remarks:['', [Validators.required]]
          });
    }

    get f() { return this.mediaout.controls; }

    hide() {
        this.dialogRef.close();
    }

    onSubmit() {
        this.submitted = true;
        if (this.mediaout.invalid) {
            return false;
        }
        let apiToCall: any;
        apiToCall = this.mediaService.sendMediaToClient(this.mediaout.value);
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