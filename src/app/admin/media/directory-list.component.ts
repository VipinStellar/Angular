import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RecoveryService } from './../../_services/recovery.service';
import { environment } from './../../../environments/environment';
import { MediaService } from './../../_services/media.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AppUtil } from 'src/app/_helpers/app.util';
@Component({
    selector: 'app-directory-list',
    templateUrl: './directory-list.component.html',
})
export class DirectoryListComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    directory: FormGroup;
    directoryList:[];
    @ViewChild('fileUploader') fileUploader:ElementRef;
    uploadUrl: string;
    errorMsg :string = 'Please fill all required fields *';
    selectedFiles?: FileList;
    uploadedFile:[];
    recoverData:any =[];
    mailFieldShow:boolean;
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private recoveryService:RecoveryService,
        private http: HttpClient,
        private mediaService: MediaService,
        private dialogRef: MatDialogRef<DirectoryListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Directory Listing';
            this.recoverData = AppUtil.recoverableData();
            this.recoveryService.fatchDirectory(this.data['media_id']).subscribe( data => {
                this.directoryList = data as any;
                if(this.directoryList.length !=0)
                this.modeltoForm(this.directoryList)
              });
        }

    ngOnInit(): void {
        this.uploadUrl = environment.apiUrl;
        this.uploadedFile = this.data['fileUpload'];
        this.directory = this.formBuilder.group({
            id:[],            
            media_id:[this.data['media_id']],            
            type: [this.data['type']],
            data_recovered:[],
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
            recoverable_data:[],
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
            recoverable_data:dir.recoverable_data,
            data_recovered:JSON.parse(dir.data_recovered),
            remarks:''
        });
    }

    onSelectFile(event) {
        this.selectedFiles = event.target.files;
        let totalSize = 0;
        if (this.selectedFiles) 
        {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                totalSize = totalSize + this.selectedFiles[i]['size'];
                if(this.selectedFiles[i]['type'] != 'application/x-zip-compressed' && this.selectedFiles[i]['type'] != 'image/png' && this.selectedFiles[i]['type'] != 'image/jpeg')
                {
                    this.toastrService.error('Only  allow  JPG,PNG,ZIP', 'Error!');
                    this.fileUploader.nativeElement.value = null;
                    this.selectedFiles = undefined;
                    return 
                }
            }
        }
        if(totalSize  > 4000000)
        {
         this.toastrService.error('File size should not be grater then 4Mb', 'Error!');
         this.fileUploader.nativeElement.value = null;
        }

    }

    uploadFiles(): void {
        if (this.selectedFiles) {
              const formData = new FormData();
              formData.append('media_id', this.data['media_id']);
            for (let i = 0; i < this.selectedFiles.length; i++) {
                formData.append('files', this.selectedFiles[i]);
                this.http.post(this.uploadUrl + 'media/upload', formData).subscribe(data => { this.uploadedFile=  data['data'];
                });
            }
            this.fileUploader.nativeElement.value = null;
            this.selectedFiles = undefined;
            
        }
    }

    deleteFile(file)
    {
        Swal.fire({
            title: 'Are you sure want to remove? ' + file.name,
            //text: 'You will not be able to recover this file!.',
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: 'Yes, go ahead.',
            cancelButtonText: 'No, let me think',
          }).then((result) => {
            if (result.value) {
              let apiToCall = this.mediaService.deleteFile(file.id);
              apiToCall.subscribe(
                data => {
                  this.toastrService.success('File delete successfully!', 'Success!');
                  this.uploadedFile =  data['data'];
                 }
              );
            } 
          });
    }

    dataRecovered(event)
    {
        this.mailFieldShow = false;
        const result = event.filter(element => element == 'Mail');
        if(result.length == 1)
            this.mailFieldShow = true;
    }
}