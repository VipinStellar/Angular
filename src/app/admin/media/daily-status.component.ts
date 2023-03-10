import { Component, OnInit } from '@angular/core';
import { Media } from 'src/app/_models/media';
import { MediaService } from './../../_services/media.service';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthUser } from 'src/app/_models/authuser';
import { AccountService } from './../../_services/account.service';
@Component({
    selector: 'daily-status-app',
    templateUrl: './daily-status.component.html',
})
export class DailyStatusComponent implements OnInit {
    pageTitle: string = "Media Daily Status";
    isLoading: boolean;
    mediaDetails: Media[] = [];
    tabItems = AppUtil.MediaTab();
    activeLink = 'Media Daily Status';
    mediaEditHistory:[];
    submitted: boolean;
    loading:boolean;
    jobStatus: FormGroup;
    statusList:[];
    user: AuthUser;
    constructor(private toastrService: ToastrService,private formBuilder: FormBuilder,
                private mediaService: MediaService, private route: ActivatedRoute, private accountService:AccountService) {}  
    ngOnInit(): void {
        this.user =  this.accountService.userValue;
        this.getMediaDetails();
        this.loadMediaHistory();
        this.jobStatus = this.formBuilder.group({
            media_id:[],  
            statusDrp:['',[Validators.required]],        
            status: ['',[Validators.required]],
          });
    }

    getMediaDetails()
    {
        this.mediaService.getMedia(this.route.snapshot.params['id']).subscribe(data => {
            this.mediaDetails = data as any;
            this.isLoading = true;
            let mediaType = AppUtil.checkMediaType(this.mediaDetails['media_type']);
            this.statusList = AppUtil.StatusRecovery(mediaType);
          });
         
    }

    loadMediaHistory()
    {
        this.mediaService.getMediaStatusHistory(this.route.snapshot.params['id']).subscribe(data => {
            this.mediaEditHistory = data as any;
          });
    }

     onSubmit()
    {
        this.submitted = true;
        if (this.jobStatus.invalid) {
            return false;
        }
        this.loading = true;
         let apiToCall: any;
         this.f['media_id'].setValue(this.mediaDetails['id'])
         apiToCall = this.mediaService.updateMediaStatus(this.jobStatus.value);
        apiToCall.subscribe(
            data => {
              this.submitted = false;
              this.toastrService.success('Details Saved successfully!', 'Success!');
                this.loadMediaHistory();
                this.Reset();
            }
        );
    }

    statusChange(val)
    {
        this.f['status'].setValue(val);
    }

    Reset()
    {
      this.submitted = false;
      this.loading = false;
      this.jobStatus.reset();
    }
    get f() { return this.jobStatus.controls; }
}