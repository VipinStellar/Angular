import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUtil } from 'src/app/_helpers/app.util';
import { MediaIn } from 'src/app/_models/mediaIn';
import { MediaInService } from 'src/app/_services/mediaIn.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'job-status-details',
  templateUrl: './job-status-details.component.html',
})

export class JobDetailStatusComponent implements OnInit {
  pageTitle: string = "Job Status";
  assignedRole: [];
  currentUrl: string;
  isAsscessDenied: boolean;
  mediaDetails: MediaIn[] = [];
  statusList:[];
  submitted: boolean;
  loading:boolean;
  public jobStatus: FormGroup;
  constructor(private mediaInService: MediaInService,private formBuilder: FormBuilder,private toastrService: ToastrService,
    private router: Router, private route: ActivatedRoute) {
  }
    ngOnInit(): void {

      this.assignedRole = this.route.snapshot.data['profileResolver'];
        this.currentUrl = this.router.url.split('/')[2];
        this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'modify', this.currentUrl);
        if (!this.isAsscessDenied)
          this.router.navigate(['admin/access-denied']);
          this.getMediaJobDetails();

          this.mediaInService.mediastatus('all').subscribe( data => {
            this.statusList = data as any;
          }); 

          this.jobStatus = this.formBuilder.group({
            media_id:[],            
            status: ['',[Validators.required]],
            remarks: ['',[Validators.required]]
          });
    }

    get f() { return this.jobStatus.controls; }

    getMediaJobDetails()
    {
      this.mediaInService.getMediaJOb(this.route.snapshot.params['id']).subscribe(data => {
        this.mediaDetails = data as any;
        this.f['media_id'].setValue(this.mediaDetails['id'])
      });
    }

    Reset()
    {
      this.loading = false;
      this.jobStatus.reset();
    }

    onSubmit()
    {
        this.submitted = true;
        if (this.jobStatus.invalid) {
            return false;
        }
         this.loading = true;
         let apiToCall: any;
         apiToCall = this.mediaInService.changeJobStatus(this.jobStatus.value);
        apiToCall.subscribe(
            data => {
              this.submitted = false;
              this.toastrService.success('Details Saved successfully!', 'Success!');
                this.getMediaJobDetails();
                this.Reset();
            }
        );
    }
}