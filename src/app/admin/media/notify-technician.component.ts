import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RecoveryService } from './../../_services/recovery.service';
@Component({
    selector: 'notify-technician',
    templateUrl: './notify-technician.component.html',
})
export class NotityTechnicianComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    notify: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private recoveryService:RecoveryService,
        private dialogRef: MatDialogRef<NotityTechnicianComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Notify Technician';
        }
    ngOnInit(): void {
        this.notify = this.formBuilder.group({
            media_id:[this.data['id']],            
            title:['', [Validators.required]],
            remarks:['', [Validators.required]]
          });
    }

    get nt() { return this.notify.controls; }

    hide() {
        this.dialogRef.close();
    }

    onSubmit() {
        this.submitted = true;
        if (this.notify.invalid) {
            return false;
        }
         let apiToCall: any;
         apiToCall = this.recoveryService.notifyTech(this.notify.value);
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