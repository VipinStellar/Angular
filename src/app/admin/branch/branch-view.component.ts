import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-branch-view',
    templateUrl: './branch-view.component.html',
})
export class BranchviewComponent implements OnInit {
    diaTitle: string;

    constructor( private dialogRef: MatDialogRef<BranchviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = "Branch Details";
       
    }

    ngOnInit(): void {
        
    }

    hide() {
        this.dialogRef.close();
    }
}