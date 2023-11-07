import { Component, OnInit, Inject,ElementRef,ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from './../../_services/payment.service';
declare var $: any; // Declare jQuery
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-payment-edit',
    templateUrl: './payment-edit.component.html',
})
export class PaymentEditComponent implements OnInit {
    diaTitle: string;
    paymnetFrom: FormGroup;
    submitted: boolean;
    serverError:string = '';
    serverErrorShow:boolean;
    @ViewChild("calRefference") calRefference: ElementRef;
    pipe = new DatePipe('en-US');
    constructor(private dialogRef: MatDialogRef<PaymentEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,private el: ElementRef,
        private toastrService: ToastrService, private paymentService: PaymentService) {
        this.diaTitle = "Pay Payment";

    }
    ngAfterViewInit() {
        $(this.el.nativeElement).find('#dateTimeCalendar').datetimepicker(
            { timePicker: true,format: 'DD-MM-YYYY hh:mm A',       
        });
      }
    ngOnInit(): void {
        this.paymnetFrom = this.formBuilder.group({
            media_id: [this.data[0]['id']],
            paid_amount: ['', [Validators.required]],
            txn_no: ['', [Validators.required]],
            payment_channel: ['Offline', [Validators.required]],
            payment_mode: ['', [Validators.required]],
            payment_date: ['',[Validators.required]],
            plan_type: [this.data[0]['FinalPrice']['plan_type']],
            existing_payment: ['', [Validators.required]],
            reqId: [''],
            po_number: [this.data[0]['po_number']]
        });
        if (this.data[1] != 1)
        {
            this.modeltofrom();
            this.CreateInvoice(this.pf['existing_payment'].value)
        }
     
    }

    modeltofrom() {
        this.paymnetFrom.setValue({
            paid_amount: this.data[1]['payment_amount'],
            txn_no: this.data[1]['payment_txnid'],
            plan_type: this.data[1]['plan_type'],
            reqId: this.data[1]['reqId'],
            payment_date: (this.data[1]['payment_timestamp'] !=null && this.data[1]['payment_timestamp']!='')?this.pipe.transform(new Date(this.data[1]['payment_timestamp']), 'd-M-yyyy h:mm a'):'',
            existing_payment: this.data[1]['existing_payment'],
            payment_channel: this.data[1]['payment_channel'],
            payment_mode: this.data[1]['payment_mode'],
            media_id: this.data[1]['media_id'],
            po_number: this.data[0]['po_number'],
        });
    }

    get pf() { return this.paymnetFrom.controls; }

    hide() {
        this.dialogRef.close();
    }

    onSubmit() {
        this.pf['payment_date'].setValue(this.calRefference.nativeElement.value);
        this.submitted = true;
        if (this.paymnetFrom.invalid) {
            return false;
        }
        let apiToCall: any;
        apiToCall = this.paymentService.addPayment(this.paymnetFrom.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Saved successfully!', 'Success!');
            },
            error => {
                let serverResponse = error.error;
                this.serverError ='';
                this.serverError ='Required fields '; 
                   for (var key in serverResponse) {
                    this.serverError = this.serverError+' ' + serverResponse[key] +', ';
                }
                this.serverError = this.serverError+' is empty. Please fill these details and try again';
                this.serverErrorShow = true;
            }
        );
    }

    validateAmount() {
        let currVal = Number(this.pf['paid_amount'].value);
        let totalAount = Number(this.data[0]['FinalPrice']['balance_amount']);
        if (totalAount < currVal) {
            // this.toastrService.error('Current amount is grater then pending amount!', 'ERROR!');
            // this.pf['paid_amount'].reset();
            this.pf['paid_amount'].setErrors({ 'message': 'Current amount is grater than pending amount!' });
        }

    }

    CreateInvoice(val) {
        if (val == 'Credit') {
            this.pf['po_number'].setValidators([Validators.required]);
            this.pf['payment_mode'].clearValidators();
            this.pf['payment_mode'].updateValueAndValidity();
            this.pf['payment_date'].clearValidators();
            this.pf['payment_date'].updateValueAndValidity();
            this.pf['txn_no'].clearValidators();
            this.pf['txn_no'].updateValueAndValidity();
        }
        else {
            this.pf['payment_mode'].setValidators([Validators.required]);
            this.pf['payment_date'].setValidators([Validators.required]);
            this.pf['txn_no'].setValidators([Validators.required]);
            this.pf['po_number'].clearValidators();
            this.pf['po_number'].updateValueAndValidity();
        }
    }
}