import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../_services/media.service';
import { AppUtil } from 'src/app/_helpers/app.util';
@Component({
    selector: 'rework-confirm',
    templateUrl: './rework.component.html',
})
export class ReworkComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    directory: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private mediaService:MediaService,
        private dialogRef: MatDialogRef<ReworkComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Rework Required';
        }

        ngOnInit(): void {
            this.directory = this.formBuilder.group({ 
                id:[this.data['id']],
                media_id:[this.data['media_id']],            
                rework_possible: [this.data['rework_possible'],[Validators.required]],
                remarks:['', [Validators.required]]
              });
        }

        get tm() { return this.directory.controls; }

        hide() {
            this.dialogRef.close();
        }

        onSubmit() {        
            this.submitted = true;
            if (this.directory.invalid) {
                return false;
            }
             let apiToCall: any;
             apiToCall = this.mediaService.reworkUpdate(this.directory.value);
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