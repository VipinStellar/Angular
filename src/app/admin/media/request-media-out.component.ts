import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../_services/media.service';
@Component({
    selector: 'app-request-media-out',
    templateUrl: './request-media-out.component.html',
})
export class RequestMediaOutComponenet implements OnInit {
    diaTitle: string;
    submitted: boolean;
    mediaout: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private mediaService:MediaService,
        private dialogRef: MatDialogRef<RequestMediaOutComponenet>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Request for Media Out';
        }
    ngOnInit(): void {
        this.mediaout = this.formBuilder.group({ 
            media_id:[this.data['id']],            
            request_type: ['',[Validators.required]],
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
        apiToCall = this.mediaService.requsetmediaout(this.mediaout.value);
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