import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../_services/media.service';
import { ContactService } from '../../_services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactEditComponent } from '../contact/contact-edit.component';
@Component({
    selector: 'app-status-update',
    templateUrl: './status-update.component.html',
})
export class StatusUpdateComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    statusFrom: FormGroup;
    stages: [];
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private mediaService:MediaService,
        private contactService:ContactService,
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<StatusUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Status Update';
        }
       ngOnInit(): void {
        this.getStatus();
        this.statusFrom = this.formBuilder.group({ 
            media_id:[this.data['id']],            
            status: ['',[Validators.required]],
            mode_of_confirmation:[''],
            mode_of_order:[''],
            po_number:[''],
            po_date:[''],
            reason: [''],
          });
    }

    get ts() { return this.statusFrom.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.statusFrom.invalid) {
            return false;
        }
        if(this.ts['mode_of_order'].value == 'On Advance' && (this.data['paid_amount'] == null || this.data['paid_amount'] ==0))
        {
            this.ts['mode_of_order'].setErrors({ 'message': "Full Advance amount not received" });
            return false;
        }
         let apiToCall: any;
         apiToCall = this.mediaService.updateStatus(this.statusFrom.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Saved successfully!', 'Success!');
            },
            error=>{
                this.ts['status'].setErrors({ 'message':  error.error});
            }
        );
    }

    hide() {
        this.dialogRef.close();
    }

    getStatus()
    {
        if(this.data['stage'] == 1 || this.data['stage'] == 2)
        {
            this.stages = [{ id: 15, stage_name: 'Not Interested' }] as any;
        }
        else if(this.data['stage'] == 3)
        {
            this.stages = [{ id: 4, stage_name: 'Media In' },{ id: 15, stage_name: 'Not Interested' }] as any;
        }
        else if(this.data['stage'] == 4 || this.data['stage'] == 5)
        {
            this.stages = [{ id: 14, stage_name: 'Not Done' },{ id: 15, stage_name: 'Not Interested' }] as any;
        }
        else if(this.data['stage'] == 8)
        {
            this.stages = [{ id: 9, stage_name: 'Confirmed' },{ id: 10, stage_name: 'Not Confirmed' },{ id: 14, stage_name: 'Not Done' },{ id: 15, stage_name: 'Not Interested' }] as any;
        }
        else if(this.data['stage'] == 9)
        {
            this.stages = [{ id: 14, stage_name: 'Not Done' },{ id: 15, stage_name: 'Not Interested' }] as any;
        }
    }

    statusChange(value)
    {
            if(value == 4)
            {
                this.contactService.getContact(this.data['contact_id']).subscribe( data => {
                    data['ButtonName'] = "Processed";
                    data['TitleName'] = "Verify Contact Details";
                    const dialogRef = this.dialog.open(ContactEditComponent, {
                        data: data as any,
                        disableClose: true,
                        autoFocus: true,
                        width: "45rem"
                      });
                      dialogRef.afterClosed().subscribe(data => {
                           if(data == 'Cancel')
                           this.hide();
                        });
                  });
               
            }

            if((value == 4 && this.data['tampered_status'] == 'Tampered' && (this.data['paid_amount'] == null || this.data['paid_amount'] == 0)) || (value == 9 &&  this.data['mode_of_confirmation'] == null))
            {
                this.ts['mode_of_confirmation'].setValidators([Validators.required]);
                this.ts['mode_of_order'].setValidators([Validators.required]);
            }
            else
            {
                this.ts['mode_of_confirmation'].clearValidators();
                this.ts['mode_of_confirmation'].updateValueAndValidity();
                this.ts['mode_of_order'].clearValidators();
                this.ts['mode_of_order'].updateValueAndValidity();
            }
    }

    OrderChange(val)
    {
        if(val == 'Purchase Order (P.O)' && (this.ts['status'].value == '4' || this.ts['status'].value == '9'))
        {
            this.ts['po_number'].setValidators([Validators.required]);
            this.ts['po_date'].setValidators([Validators.required]);
        }
        else
        {
            this.ts['po_number'].clearValidators();
            this.ts['po_number'].updateValueAndValidity();
            this.ts['po_date'].clearValidators();
            this.ts['po_date'].updateValueAndValidity();
        }
    }

}