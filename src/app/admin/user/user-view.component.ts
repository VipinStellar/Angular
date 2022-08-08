import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-branch-view',
    templateUrl: './user-view.component.html',
})
export class UseriewComponent implements OnInit {
    diaTitle: string;

    constructor( private dialogRef: MatDialogRef<UseriewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = "User Details";
        console.log(data);
       
    }

    ngOnInit(): void {
        
    }

    hide() {
        this.dialogRef.close();
    }
}