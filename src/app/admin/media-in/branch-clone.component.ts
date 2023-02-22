import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RecoveryService } from '../../_services/recovery.service';
import { MediaInService } from '../../_services/mediaIn.service';
@Component({
    selector: 'app-branch-clone',
    templateUrl: './branch-clone.component.html',
})
export class BrannchClone implements OnInit {
    diaTitle: string;
    submitted: boolean;
    userFrom: FormGroup;
    userList:[];
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private recoveryService:RecoveryService,
        private mediaInService:MediaInService,
        private dialogRef: MatDialogRef<BrannchClone>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Transfer Clone';
            this.mediaInService.mediauserlist(this.data).subscribe( data => {
                this.userList = data as any;
              });
        }
       ngOnInit(): void {        
        this.userFrom = this.formBuilder.group({ 
            media_id:[this.data],            
            user_id: ['',[Validators.required]],
            remarks:['', [Validators.required]]
          });
    }

    get uf() { return this.userFrom.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.userFrom.invalid) {
            return false;
        }
         let apiToCall: any;
         apiToCall = this.recoveryService.branchClone(this.userFrom.value);
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