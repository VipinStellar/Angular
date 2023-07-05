import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../_services/media.service';
@Component({
    selector: 'app-responce-media-out',
    templateUrl: './responce-media-out.component.html',
})
export class ResponceMediaOutComponenet implements OnInit {
    diaTitle: string;
    submitted: boolean;
    mediaout: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private mediaService:MediaService,
        private dialogRef: MatDialogRef<ResponceMediaOutComponenet>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Send Media to Front Desk';
        }
    ngOnInit(): void {
        this.mediaout = this.formBuilder.group({ 
            id:[this.data['id']],            
            media_id:[this.data['media_id']],         
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
        apiToCall = this.mediaService.responcemediaout(this.mediaout.value);
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