import { Component, OnInit, Inject } from '@angular/core';
import { MediaInService } from './../../_services/mediaIn.service';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaIn } from  './../../_models/mediaIn';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-media-case',
    templateUrl: './media-case-details.component.html',
})
export class MediaCaseDetail implements OnInit {
    pageTitle:string ="Case Details";
    assignedRole: [];
    currentUrl: string;
    isLoading:boolean;
    isAsscessDenied: boolean;
    mediaDetails : MediaIn[] = [];
    tabItems = AppUtil.getMediaTab();
    activeLink = this.tabItems[0];
    constructor( private mediaInService: MediaInService,
                 private router: Router, private route: ActivatedRoute,
                 private toastrService: ToastrService) {
    }
    ngOnInit(): void {
        this.assignedRole = this.route.snapshot.data['profileResolver'];
        this.currentUrl = this.router.url.split('/')[2];
        this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'modify', this.currentUrl);
        if (!this.isAsscessDenied)
            this.router.navigate(['admin/access-denied']); 
            this.loadMediaDetails();
    }

    loadMediaDetails()
    {
        this.mediaInService.getMedia(this.route.snapshot.params['id']).subscribe( data => {
            this.mediaDetails = data as any;
            this.isLoading = true;
          });
    }

    onchangetab(event)
    {
      this.router.navigate([AppUtil.getTabUrl(event),this.mediaDetails['id']]);
    }

    generateCode(transferid)
    {
      let msg = "Do Media in";
      if(this.mediaDetails['transferMedia']['new_branch_id'] == '23')
      msg = "Do Media in at Head Office";
        Swal.fire({
            title: msg,
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: "#007bff",
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.value) {
              let apiToCall = this.mediaInService.generateMediaCode(transferid);
              apiToCall.subscribe(
                data => {
                  this.toastrService.success('Media In successfully!', 'Success!');
                  this.loadMediaDetails();
                }
              );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
      
            }
          });
    }

}