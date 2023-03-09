import { Component, OnInit } from '@angular/core';
import { MediaService } from './../../_services/media.service';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from  './../../_models/media';
import { AccountService } from './../../_services/account.service';
import { AuthUser } from 'src/app/_models/authuser';
import { RecoveryComponent } from './recovery.component';
import { MatDialog } from '@angular/material/dialog';
import { CloneTransferComponenet } from './clone-transfer.component';
@Component({
    selector: 'app-media-process',
    templateUrl: './media-process.component.html',
})
export class MediaJobProcessComponent implements OnInit {
    mediaDetails : Media[] = [];
    tabItems = AppUtil.MediaTab();
    activeLink = 'Job Process';
    _history:[];
    user: AuthUser;
    constructor(private mediaService: MediaService, private route: ActivatedRoute,
                private accountService:AccountService,public dialog: MatDialog) {}
    
    ngOnInit(): void {
        this.user =  this.accountService.userValue;
        this.loadMediaDetails();
        this.loadMediaHistory();
    }

    loadMediaDetails()
    {
        this.mediaService.getMedia(this.route.snapshot.params['id']).subscribe( data => {
            this.mediaDetails = data as any;
          });                    
    }

    loadMediaHistory()
    {
        this.mediaService.mediaHistory(this.route.snapshot.params['id']).subscribe( data => {
            this._history = data as any;
          }); 
    }

    editRecovery(type) {
        const dialogRef = this.dialog.open(RecoveryComponent, {
          data: {'media_id':this.mediaDetails['id'],'type':type},
          disableClose: true,
          autoFocus: true,
          width: "60rem"
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadMediaHistory();
            this.loadMediaDetails();
        });    
      }

      branchClone()
      {
        const dialogRef = this.dialog.open(CloneTransferComponenet, {
          data: this.mediaDetails['id'],
          disableClose: true,
          autoFocus: true,
          width: "30rem"
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadMediaDetails();
            this.loadMediaHistory();
        }); 
      }

}