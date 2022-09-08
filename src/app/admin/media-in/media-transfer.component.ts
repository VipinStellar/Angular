import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaInService } from './../../_services/mediaIn.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-media-case',
    templateUrl: './media-transfer.component.html',
  })
  export class MediaTransfer implements OnInit {
    diaTitle: string;
    submitted: boolean;
    loading:boolean;
    public media: FormGroup;
    branchList:[];
    constructor(private formBuilder: FormBuilder,
        private mediaInService: MediaInService,
        private toastrService: ToastrService,
        private dialogRef: MatDialogRef<MediaTransfer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = "Transfer media to other branch/HO";
        this.mediaInService.getAllBranch().subscribe( data => {
            this.branchList = data as any;
          });
    }
    ngOnInit(): void {
        this.media = this.formBuilder.group({
             media_id:[this.data[0]],            
             branch_id: ['',[Validators.required]],
             reason: ['',[Validators.required]],
             extension_required:[],
             extension_day:[]
           });
    }

    onSubmit() {
        this.submitted = true;
        if (this.media.invalid) {
            return false;
        }
         this.loading = true;
         let apiToCall: any;
         apiToCall = this.mediaInService.saveMediatransfer(this.media.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Saved successfully!', 'Success!',{timeOut: 3000});
               // this.toastrService.success('Email has been Send', 'Success!',{timeOut: 3000});
            },
            error=>{
                console.log(error)
            }
        );
    }

    get f() { return this.media.controls; }

    hide() {
        this.dialogRef.close();
    }
  }