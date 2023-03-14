import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../_services/media.service';
@Component({
    selector: 'app-allot-change',
    templateUrl: './allot-change.component.html',
})
export class AllotChangeComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    teamFrom: FormGroup;
    deptUser:[];
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private mediaService:MediaService,
        private dialogRef: MatDialogRef<AllotChangeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Assign Job';
        }
       ngOnInit(): void {
        this.teamFrom = this.formBuilder.group({ 
            media_id:[this.data['mediaId']],            
            team_id: ['',[Validators.required]],
            user_id: ['',[Validators.required]],
            remarks:['', [Validators.required]]
          });
    }

    get tm() { return this.teamFrom.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.teamFrom.invalid) {
            return false;
        }
         let apiToCall: any;
         apiToCall = this.mediaService.updateAllotJob(this.teamFrom.value);
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

    deptChange(id)
    {
        this.mediaService.deptUser(id).subscribe( data => {
            this.deptUser = data as any;
        });
    }
}