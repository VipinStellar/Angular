import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'preview-data',
    templateUrl: './preview-data.component.html',
})
export class PreviewData implements OnInit {
    diaTitle: string;
    copymedia = [];
    constructor(
        private dialogRef: MatDialogRef<PreviewData>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = 'Directory Listing Details';
        if (data['Directory_Listing']['copyin_details'] != null) {
            this.copymedia = JSON.parse(data['Directory_Listing']['copyin_details']);
            }
            this.data['Directory_Listing']['data_recovered'] = JSON.parse(this.data['Directory_Listing']['data_recovered']);

    }
    ngOnInit(): void {
    }

    hide() {
        this.dialogRef.close();
    }
}