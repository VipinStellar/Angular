import { Component, OnInit, Inject } from '@angular/core';
import { MediaInService } from './../../_services/mediaIn.service';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaIn } from './../../_models/mediaIn';
import { MatDialog } from '@angular/material/dialog';
import { MediaAssignToAdd } from './media-assign-to-add.component';
import { MediaEdit } from './media-edit.component';
import { AccountService } from './../../_services/account.service';
import { MediaTransfer } from './media-transfer.component';
import { MediaTeam } from './media-team.component';
@Component({
  selector: 'app-media-case',
  templateUrl: './media-pre.component.html',
})
export class MediaPreComponent implements OnInit {
  pageTitle: string = "Pre Inspection";
  assignedRole: [];
  currentUrl: string;
  isAsscessDenied: boolean;
  isLoading: boolean;
  mediaDetails: MediaIn[] = [];
  mediaAssignHistory: [];
  mediaTransferHistory: [];
  mediaEditHistory: [];
  showEdit: boolean;
  showAssign:boolean;
  teamAssign:boolean;
  teamList: [];
  tabItems = AppUtil.getMediaTab();
  activeLink ;
  constructor(private mediaInService: MediaInService,
    private router: Router, private route: ActivatedRoute,
    private accountService: AccountService, public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.assignedRole = this.route.snapshot.data['profileResolver'];
    this.teamList = this.route.snapshot.data['teamList'];
    this.currentUrl = this.router.url.split('/')[2];
    this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'modify', this.currentUrl);
    if (!this.isAsscessDenied)
      this.router.navigate(['admin/access-denied']);
      this.activelink();

  }

  activelink()
  {
    this.getMediaDetails();

    if(this.currentUrl == "pre-analysis")
    {
      this.activeLink = this.tabItems[2];
      this.getMediaEditHistory();
      this.getMediaAssignHistory();
    }
    else  if(this.currentUrl == "transfer-media")
    {
      this.activeLink = this.tabItems[1];
      this.getMediaTransferHistory();
    }
  }

  getMediaDetails() {
    this.mediaInService.getMedia(this.route.snapshot.params['id']).subscribe(data => {
      this.mediaDetails = data as any;
      this.isLoading = true;
      this.editButton();
      this.assignButton();
      this.assignTeamButton();
    });
  }

  assignTeamButton()
  {
    this.teamAssign = false;
    if(this.mediaDetails['transfer_id'] != null  && this.mediaDetails['transferMedia']['media_in_status'] != 0 && this.mediaDetails['transferMedia']['new_branch_id'] == 23 && this.mediaDetails['team_assign'] == 0 && this.mediaDetails['team_id'] == 0)
    {
        this.teamAssign = true;
    }
  }

  editButton()
  {
    this.showEdit = false;
    if (this.mediaDetails['user_id'] == this.accountService.userValue.id && (this.mediaDetails['preHis']==null ||  this.mediaDetails['preHis'][0]['status'] !=2))
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
    if(this.mediaDetails['preHis']==null || this.mediaDetails['preHis'][0]['status'] !=2)
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

  getMediaAssignHistory() {
    this.mediaInService.mediaHistory(this.route.snapshot.params['id'], 'assign','media_in').subscribe(data => {
      this.mediaAssignHistory = data as any;

    });
  }

  getMediaEditHistory() {
    this.mediaInService.mediaHistory(this.route.snapshot.params['id'], 'edit','media_in').subscribe(data => {
      this.mediaEditHistory = data as any;
    });
  }

  getMediaTransferHistory() {
    this.mediaInService.mediaHistory(this.route.snapshot.params['id'], 'transfer','media_in').subscribe(data => {
      this.mediaTransferHistory = data as any;
    });
  }

  transferMedia()
  {
    const dialogRef = this.dialog.open(MediaTransfer, {
      data: [this.mediaDetails['id'],this.mediaDetails['branch_id']],
      disableClose: true,
      autoFocus: true,
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {
       this.getMediaTransferHistory();
       this.getMediaDetails();
    });
  }

  addAssignTo() {
    const dialogRef = this.dialog.open(MediaAssignToAdd, {
      data: [this.mediaDetails['user_id'],this.mediaDetails['id'],"media_in"],
      disableClose: true,
      autoFocus: true,
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMediaAssignHistory();
      this.getMediaDetails();
    });

  }

  addAssignTeam()
  {
    const dialogRef = this.dialog.open(MediaTeam, {
      data: [this.mediaDetails['id'],this.teamList],
      disableClose: true,
      autoFocus: true,
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {
     this.getMediaTransferHistory();
     this.getMediaDetails();
    });
  }

  editMediaInTo() {
    const dialogRef = this.dialog.open(MediaEdit, {
      data:this.mediaDetails,
      disableClose: true,
      autoFocus: false,
      width: "74vw",

    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMediaEditHistory();
      this.getMediaDetails();
    });
  }

  onchangetab(event)
  {
    this.router.navigate([AppUtil.getTabUrl(event),this.mediaDetails['id']]);

  }
}