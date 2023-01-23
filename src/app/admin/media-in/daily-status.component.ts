import { Component, OnInit, Inject } from '@angular/core';
import { MediaIn } from 'src/app/_models/mediaIn';
import { MediaInService } from './../../_services/mediaIn.service';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-daily-status',
    templateUrl: './daily-status.component.html',
})
export class DailyStatus implements OnInit {
    pageTitle: string = "Media Daily Status";
    isLoading: boolean;
    mediaDetails: MediaIn[] = [];
    tabItems = AppUtil.getMediaRecoveryTab();
    activeLink = this.tabItems[2];
    mediaEditHistory: [];
    submitted: boolean;
    loading:boolean;
    jobStatus: FormGroup;
    statusList:[];
    constructor(private toastrService: ToastrService,private formBuilder: FormBuilder,private mediaInService: MediaInService,private router: Router, private route: ActivatedRoute) {}  
    ngOnInit(): void {
        this.getMediaDetails();
        this.getMediaStatusHistory();
        this.jobStatus = this.formBuilder.group({
            media_id:[],  
            statusDrp:['',[Validators.required]],        
            status: ['',[Validators.required]],
          });
    }

    getMediaDetails()
    {
        this.mediaInService.getMedia(this.route.snapshot.params['id']).subscribe(data => {
            this.mediaDetails = data as any;
            this.isLoading = true;
          });
          let media_type:any = this.mediaDetails['media_type'];
          let mediaType = AppUtil.checkMediaType(media_type);
          this.statusList = AppUtil.StatusRecovery(mediaType);
    }

    getMediaStatusHistory()
    {
        this.mediaInService.getMediaStatusHistory(this.route.snapshot.params['id']).subscribe(data => {
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
         apiToCall = this.mediaInService.updateMediaStatus(this.jobStatus.value);
        apiToCall.subscribe(
            data => {
              this.submitted = false;
              this.toastrService.success('Details Saved successfully!', 'Success!');
                this.getMediaStatusHistory();
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

    onchangetab(item)
      {
        if(item == 'Media Daily Status')
        this.router.navigate(['admin/daily-status/'+this.mediaDetails['id']]);
        else if(item == 'Case Details')
        this.router.navigate(['admin/observation-details/'+this.mediaDetails['id']]);
        else
        this.router.navigate(['admin/observation/'+this.mediaDetails['id']]);
      }
}