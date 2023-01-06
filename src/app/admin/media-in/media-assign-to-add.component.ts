import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaInService } from './../../_services/mediaIn.service';
import { ToastrService } from 'ngx-toastr';
import {MediaIn} from './../../_models/mediaIn';
@Component({
    selector: 'app-media-case-add',
    templateUrl: './media-assign-to-add.component.html',
})
export class MediaAssignToAdd implements OnInit {
    diaTitle: string;
    submitted: boolean;
    loading:boolean;
    mediaInDetails :MediaIn[] = [];
    assignUserList:[];
    public assignTo: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private mediaInService: MediaInService,
        private toastrService: ToastrService,
        private dialogRef: MatDialogRef<MediaAssignToAdd>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = "Assign To";
        
        this.mediaInService.mediauserlist(data[1]).subscribe( data => {
            this.assignUserList = data as any;
          }); 
    }
    
    ngOnInit(): void {
        this.assignTo = this.formBuilder.group({
            user_id: ['', [Validators.required]]
           });
       this.f['user_id'].setValue(this.data[0]);
    }

    get f() { return this.assignTo.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.assignTo.invalid) {
            return false;
        }
        this.loading = true;
        let { media_id,user_id,module_type } = this.assignTo.value;
        let dataToPost: any = { media_id,user_id,module_type };
        dataToPost.media_id = this.data[1];
        dataToPost.module_type = this.data[2];
        let apiToCall: any;
        apiToCall = this.mediaInService.changeMediaAssign(dataToPost);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('User Saved successfully!', 'Success!');
            }
        );
    }

    hide() {
        this.dialogRef.close();
    }
}