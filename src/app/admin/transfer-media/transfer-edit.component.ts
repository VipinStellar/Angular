import { Component, OnInit} from '@angular/core';
import { MediaService } from './../../_services/media.service';
import { ActivatedRoute } from '@angular/router';
import { Media } from  './../../_models/media';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthUser } from 'src/app/_models/authuser';
import { AccountService } from 'src/app/_services/account.service';
@Component({
    selector: 'app-transfer-edit',
    templateUrl: './transfer-edit.component.html',
})
export class TransferEditComponent implements OnInit {
    user: AuthUser;
    pageTitle:string ="Case Details";
    mediaDetails : Media[] = [];
    _history:[];
    public media: FormGroup;
    branchList:[];
    submitted:boolean=false;
    loading:boolean = true;
    originalMedia:boolean;
    constructor(private mediaService: MediaService,private formBuilder: FormBuilder,
                private route: ActivatedRoute,private toastrService: ToastrService,private accountService:AccountService,) {
    }
    ngOnInit(): void {
        this.user =  this.accountService.userValue;
        this.mediaService.gettransferbranch().subscribe( data => {
            this.branchList = data as any;
            this.loadMediaDetails();
            this.loadOriginalMedia();
            this.loadTransferHistory();
        });
        this.loadFrom();
    }

    loadFrom()
    {
        this.media = this.formBuilder.group({
            media_id:[],            
            branch_id: ['',[Validators.required]],
            reason: ['',[Validators.required]],
            extension_required:[],
            extension_day:[],
            assets_type:['',[Validators.required]],
            assets_type_other:[],
          });
    }

    get f() { return this.media.controls; }

    cancle() {
        this.submitted = false;
        this.media.reset();
    }

    loadOriginalMedia()
    {
        this.mediaService.getOriginalMedia(this.route.snapshot.params['id']).subscribe( data => {
            this.originalMedia = data as any;
        }); 
    }

    loadMediaDetails()
    {
        this.mediaService.getMedia(this.route.snapshot.params['id']).subscribe( data => {
            this.mediaDetails = data as any;
            this.loading = false;
            for(var i = 0; i < this.branchList.length; i++) {
                if(this.mediaDetails['new_branch_id'] != null && this.branchList[i]['id'] === this.mediaDetails['new_branch_id'])
                   this.branchList.splice(i, 1);
                else if(this.mediaDetails['new_branch_id'] == null && this.branchList[i]['id'] === this.mediaDetails['branch_id'])
                    this.branchList.splice(i, 1);
             }
          }); 
    }

    loadTransferHistory()
    {
        this.mediaService.mediaHistory(this.route.snapshot.params['id']).subscribe( data => {
            this._history = data as any;
          }); 
    }

    onSubmit() {
        this.submitted = true;
        if (this.media.invalid) {
            return false;
        }
        this.f['media_id'].setValue(this.mediaDetails['id']);
        if (this.f['assets_type'].value == 'Other') {
            this.f['assets_type'].setValue(this.f['assets_type_other'].value)
        }
         let apiToCall: any;
         apiToCall = this.mediaService.saveMediatransfer(this.media.value);
        apiToCall.subscribe(
            data => {
                this.cancle();
                this.loadOriginalMedia();
                this.loadTransferHistory();
                this.loadMediaDetails();
                this.toastrService.success('Details Saved successfully!', 'Success!');
            },
            error=>{
                console.log(error)
            }
        );
    }

}