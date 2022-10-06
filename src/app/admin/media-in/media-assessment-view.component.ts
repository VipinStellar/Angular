import { Component, OnInit, Inject } from '@angular/core';
import { MediaInService } from './../../_services/mediaIn.service';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaIn } from './../../_models/mediaIn';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from './../../_services/account.service';
import { MediaAssignToAdd } from './media-assign-to-add.component';
@Component({
    selector: 'app-media-assessment-view',
    templateUrl: './media-assessment-view.component.html',
  })
  export class MediaAssessmentView implements OnInit {
    pageTitle: string = "Media Inspection";
    assignedRole: [];
    currentUrl: string;
    isAsscessDenied: boolean;
    isLoading: boolean;
    mediaDetails: MediaIn[] = [];
    showEdit: boolean;
    showAssign:boolean;
    mediaAssignHistory: [];
    mediaEditHistory:[];
    tabItems = AppUtil.getMediaTab();
    activeLink;
    constructor(private mediaInService: MediaInService,
        private router: Router, private route: ActivatedRoute,
        private accountService: AccountService, public dialog: MatDialog) {
      }
    ngOnInit(): void {
        this.assignedRole = this.route.snapshot.data['profileResolver'];
        this.currentUrl = this.router.url.split('/')[2];
        this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'modify', this.currentUrl);
        if (!this.isAsscessDenied)
          this.router.navigate(['admin/access-denied']);
          this.activelink();
    }

    activelink()
    {
      this.getMediaDetails();
      this.getMediaEditHistory();
      this.getMediaAssignHistory();
      this.activeLink = this.tabItems[3];
      this.getMediaAssignHistory();
    }
    editButton()
    {
        this.showEdit = false;
        if (this.mediaDetails['user_id'] == this.accountService.userValue.id && this.mediaDetails['stage'] !=5)
        {
          if(this.mediaDetails['transfer_id'] != null  && this.mediaDetails['transferMedia']['media_in_status'] == 0)
          {
            this.showEdit = false;
          }
          else if(this.mediaDetails['transfer_id'] != null  && this.mediaDetails['transferMedia']['media_in_status'] != 0 && this.mediaDetails['transferMedia']['new_branch_id'] == 23 && this.mediaDetails['team_id'] == 0)
          {
            this.showEdit = false;
          }
          else
          {
            this.showEdit = true;
          }
        }
    }

    assignButton()
    {
      this.showAssign = false;
      if(this.mediaDetails['stage'] !=5)
      {
        if(this.mediaDetails['transfer_id'] != null  && this.mediaDetails['transferMedia']['media_in_status'] == 0)
        {
          this.showAssign = false;
        }
        else if(this.mediaDetails['transfer_id'] != null  && this.mediaDetails['transferMedia']['media_in_status'] != 0 && this.mediaDetails['transferMedia']['new_branch_id'] == 23 && this.mediaDetails['team_id'] == 0)
        {
          this.showAssign = false;
        }
        else
        {
          this.showAssign = true;
        }
      }
    }

    getMediaDetails() {
      this.mediaInService.getMedia(this.route.snapshot.params['id']).subscribe(data => {
        this.mediaDetails = data as any;
        this.editButton();
        this.assignButton();
        this.isLoading = true;
      });
    }
    
      getMediaEditHistory() {
        this.mediaInService.mediaHistory(this.route.snapshot.params['id'], 'edit','assessment').subscribe(data => {
          this.mediaEditHistory = data as any;
        });
      }

      getMediaAssignHistory() {
        this.mediaInService.mediaHistory(this.route.snapshot.params['id'], 'assign','assessment').subscribe(data => {
          this.mediaAssignHistory = data as any;
        });
      }

    onchangetab(event) {
      this.router.navigate([AppUtil.getTabUrl(event),this.mediaDetails['id']]);
      }


      editAssessment()
      {
        this.router.navigate(['admin/media-assessment/edit/'+this.mediaDetails['id']]);
      }

      addAssignTo() {
        const dialogRef = this.dialog.open(MediaAssignToAdd, {
          data: [this.mediaDetails['user_id'],this.mediaDetails['id'],"assessment"],
          disableClose: true,
          autoFocus: true,
          width: "500px"
        });
        dialogRef.afterClosed().subscribe(result => {
          this.getMediaAssignHistory();
          this.getMediaDetails();
        });
    
      }
  }