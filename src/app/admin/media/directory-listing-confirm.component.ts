import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../_services/media.service';
import { AppUtil } from 'src/app/_helpers/app.util';
@Component({
    selector: 'directory-listing-confirm',
    templateUrl: './directory-listing-confirm.component.html',
})
export class DirectoryConfirmComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    directory: FormGroup;
    caseNotPossibleObj:any =[];
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private mediaService:MediaService,
        private dialogRef: MatDialogRef<DirectoryConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Directory Listing Confirmation';
        }
       ngOnInit(): void {
        this.caseNotPossibleObj = AppUtil.caseNotPossible('Hard Drive');
        this.directory = this.formBuilder.group({ 
            id:[this.data['id']],
            media_id:[this.data['media_id']],            
            rework: [this.data['rework'],[Validators.required]],
            no_recovery_reason: [],
            no_recovery_reason_other: [],
            remarks:['', [Validators.required]]
          });
    }

    get tm() { return this.directory.controls; }

    onSubmit() {
        
        this.submitted = true;
        if (this.directory.invalid) {
            return false;
        }
         let apiToCall: any;
         apiToCall = this.mediaService.updateMediaDl(this.directory.value);
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