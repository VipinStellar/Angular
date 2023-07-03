import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
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
            remarks:['', [Validators.required]],
            file: new FormControl('', [Validators.required]),
            fileSource: new FormControl()
          });

          this.wipingFrom.get("wiping_status")?.valueChanges.subscribe(x => {
            if(x == 'Yes')
            {
                this.wipingFrom.get('file')?.setValidators([Validators.required]);
                this.wipingFrom.get('file')?.updateValueAndValidity();
            }
            else
            {
                this.wipingFrom.get('file')?.clearValidators();
                this.wipingFrom.get('file')?.updateValueAndValidity();
            }
                
          });
    }

    get tm() { return this.wipingFrom.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.wipingFrom.invalid) {
            return false;
        }
        const formData = new FormData();
        if(this.tm['wiping_status'].value == 'Yes')
        {           
            formData.append('file', this.tm['fileSource'].value);
        }
        formData.append('media_id', this.tm['media_id'].value);
        formData.append('id', this.tm['id'].value);
        formData.append('wiping_status', this.tm['wiping_status'].value);
        formData.append('remarks', this.tm['remarks'].value);
         let apiToCall: any;
         apiToCall = this.mediaService.updateWipeStatus(formData);
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

    onFileChange(event) {  
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.wipingFrom.patchValue({
              fileSource: file
            });
          }
      }
}