import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaInService } from './../../_services/mediaIn.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-media-team',
    templateUrl: './media-team.component.html',
})
export class MediaTeam implements OnInit {
    diaTitle: string;
    submitted: boolean;
    loading:boolean;
    public media: FormGroup;
    teamList:[];
    constructor(private formBuilder: FormBuilder,
        private mediaInService: MediaInService,
        private toastrService: ToastrService,
        private dialogRef: MatDialogRef<MediaTeam>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = "Media Assign To Team";
    }

    ngOnInit(): void {
        this.teamList = this.data[1]
        this.media = this.formBuilder.group({
            media_id:[this.data[0]],            
            team_id: ['',[Validators.required]],
          });
    }

    get f() { return this.media.controls; }

    hide() {
        this.dialogRef.close();
    }

    onSubmit()
    {
        this.submitted = true;
        if (this.media.invalid) {
            return false;
        }
         this.loading = true;
         let apiToCall: any;
         apiToCall = this.mediaInService.saveMediateam(this.media.value);
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
}