import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppUtil } from 'src/app/_helpers/app.util';
import { RecoveryService } from './../../_services/recovery.service';
@Component({
    selector: 'app-directory-list',
    templateUrl: './directory-list.component.html',
})
export class DirectoryListComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    directory: FormGroup;
    directoryList:[];
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private recoveryService:RecoveryService,
        private dialogRef: MatDialogRef<DirectoryListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Directory Listing';
            this.recoveryService.fatchDirectory(this.data['media_id']).subscribe( data => {
                this.directoryList = data as any;
                if(this.directoryList.length !=0)
                this.modeltoForm(this.directoryList)
              });
        }

    ngOnInit(): void {
        this.directory = this.formBuilder.group({
            id:[],            
            media_id:[this.data['media_id']],            
            type: [this.data['type']],
            total_file: [],
            total_data_size: [],
            total_mail: [],
            total_mail_size: [],
            mail_data: [],
            data_store_media: [],
            directory_listing: [],
            data_delivery: [],
            email_notification: [],
            total_data_size_format:[],
            total_mail_size_format:[],
            remarks:['', [Validators.required]]
          });
    }

    get dr() { return this.directory.controls; }

    hide() {
        this.dialogRef.close();
    }

    onSubmit() {
        this.submitted = true;
        if (this.directory.invalid) {
            return false;
        }
         let apiToCall: any;
         apiToCall = this.recoveryService.updateDirectory(this.directory.value);
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

    modeltoForm(dir)
    {
        this.directory.setValue({
            id:dir.id,
            media_id:dir.media_id,
            type: this.data['type'],
            total_file:dir.total_file,
            total_data_size:dir.total_data_size,
            total_mail:dir.total_mail,
            total_mail_size:dir.total_mail_size,
            mail_data:dir.mail_data,
            data_store_media:dir.data_store_media,
            directory_listing:dir.directory_listing,
            data_delivery:dir.data_delivery,
            email_notification:(dir.email_notification == 1)?true:false,
            total_data_size_format:dir.total_data_size_format,
            total_mail_size_format:dir.total_mail_size_format,
            remarks:''
        });
    }
}