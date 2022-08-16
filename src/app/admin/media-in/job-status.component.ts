import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaInService } from './../../_services/mediaIn.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'job-status',
    templateUrl: './job-status.component.html',
})
export class JobStatus implements OnInit {
    diaTitle: string;
    submitted: boolean;
    loading:boolean;
    public jobStatus: FormGroup;
    statusList:[];
    selectedMedia;

    constructor(private formBuilder: FormBuilder,
        private mediaInService: MediaInService,
        private toastrService: ToastrService,
        private dialogRef: MatDialogRef<JobStatus>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = "Job Status";
        this.statusList = data[1];
        this.selectedMedia = data[0];
    }

    ngOnInit(): void {
        this.jobStatus = this.formBuilder.group({
            media_id:[this.selectedMedia['id']],            
            status: [this.selectedMedia['jobStatusId'],[Validators.required]],
            remarks: ['',[Validators.required]]
          });
    }

    get f() { return this.jobStatus.controls; }

    hide() {
        this.dialogRef.close();
    }

    onSubmit()
    {
        this.submitted = true;
        if (this.jobStatus.invalid) {
            return false;
        }
         this.loading = true;
         let apiToCall: any;
         apiToCall = this.mediaInService.changeJobStatus(this.jobStatus.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Save successfully!', 'Success!',{timeOut: 3000});
            }
        );
    }
}