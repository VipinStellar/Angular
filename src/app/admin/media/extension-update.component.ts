import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RecoveryService } from './../../_services/recovery.service';
@Component({
    selector: 'app-extension-update',
    templateUrl: './extension-update.component.html',
})
export class ExtensionUpdateComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    recovery: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private recoveryService:RecoveryService,
        private dialogRef: MatDialogRef<ExtensionUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Extension Required';
        }
    ngOnInit(): void {
        this.recovery = this.formBuilder.group({
            media_id:[this.data['media_id']],            
            type: [this.data['type']],
            extension_type:['', [Validators.required]],
            remarks:['', [Validators.required]]
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
         apiToCall = this.recoveryService.updateExtension(this.recovery.value);
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