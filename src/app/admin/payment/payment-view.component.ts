import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-payment-view',
    templateUrl: './payment-view.component.html',
})
export class PaymentViewComponent implements OnInit {
    diaTitle: string;

    constructor( private dialogRef: MatDialogRef<PaymentViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = "Payment Details";
       
    }

    ngOnInit(): void {
        
    }

    hide() {
        this.dialogRef.close();
    }
}