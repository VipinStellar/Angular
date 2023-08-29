import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-contact-view',
    templateUrl: './contact-view.component.html',
})
export class ContactViewComponent implements OnInit {
    diaTitle: string;

    constructor( private dialogRef: MatDialogRef<ContactViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = "Contact Details";
       
    }
    ngOnInit(): void {
        
    }
    
    hide() {
        this.dialogRef.close();
    }
}