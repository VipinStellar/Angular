import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-company-view',
    templateUrl: './company-view.component.html',
})
export class CompanyViewComponent implements OnInit {
    diaTitle: string;

    constructor( private dialogRef: MatDialogRef<CompanyViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = "Company Details";
       
    }
    ngOnInit(): void {
        
    }
    
    hide() {
        this.dialogRef.close();
    }
}