import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../_services/media.service';
@Component({
    selector: 'wiping-edit',
    templateUrl: './wiping-edit.component.html',
})
export class WipingEditComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    wipingFrom: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private mediaService:MediaService,
        private dialogRef: MatDialogRef<WipingEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Wiping';
        }
       ngOnInit(): void {
        this.wipingFrom = this.formBuilder.group({ 
            media_id:[this.data['media_id']],            
            id: [this.data['id']],
            wiping_status: ['',[Validators.required]],
            remarks:['', [Validators.required]]
          });
    }

    get tm() { return this.wipingFrom.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.wipingFrom.invalid) {
            return false;
        }
         let apiToCall: any;
         apiToCall = this.mediaService.updateWipeStatus(this.wipingFrom.value);
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