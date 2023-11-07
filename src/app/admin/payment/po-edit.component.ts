import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from './../../_services/payment.service';
@Component({
    selector: 'app-po-edit-edit',
    templateUrl: './po-edit.component.html',
})
export class PoEditComponent implements OnInit {
    diaTitle: string;
    poFrom: FormGroup;
    submitted: boolean;
    constructor(private dialogRef: MatDialogRef<PoEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
        private toastrService: ToastrService, private paymentService: PaymentService) {
        this.diaTitle = "Edit PO Number";

    }
    ngOnInit(): void {
        this.poFrom = this.formBuilder.group({
            id: [this.data['id']],
            po_date: [this.data['po_date'], [Validators.required]],
            po_number: [this.data['po_number'], [Validators.required]]
        });
    }

     get po() { return this.poFrom.controls; }

    hide() {
        this.dialogRef.close();
    }

    onSubmit() {
        this.submitted = true;
        if (this.poFrom.invalid) {
            return false;
        }
        let apiToCall: any;
        apiToCall = this.paymentService.updatePONumber(this.poFrom.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Saved successfully!', 'Success!');
            },
            error => {
                console.log(error)
            }
        );
    }


   
}