import { Component, OnInit } from '@angular/core';
import { MediaService } from './../../_services/media.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from  './../../_models/media';
import { AccountService } from './../../_services/account.service';
import { AuthUser } from 'src/app/_models/authuser';
import { RecoveryComponent } from './recovery.component';
import { MatDialog } from '@angular/material/dialog';
import { CloneTransferComponenet } from './clone-transfer.component';
import { ExtensionComponent } from './extension.component';
import { DirectoryListComponent } from './directory-list.component';
import { DirectoryConfirmComponent } from './directory-listing-confirm.component';
@Component({
    selector: 'app-media-process',
    templateUrl: './media-process.component.html',
})
export class MediaJobProcessComponent implements OnInit {
    mediaDetails : Media[] = [];
    _history:[];
    user: AuthUser;
    isEdit:boolean=false;
    recListShow:boolean = false;
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
            this.buttonShow(this.mediaDetails['stage']);
            if(this.mediaDetails['stage'] > 7 )
            this.recListShow = true;
          });                    
    }

    buttonShow(status)
    {
      if(this.user.id == this.mediaDetails['user_id'] && (status == 8 || status==14) )
            this.isEdit = true;
      else
        this.isEdit = false;
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

      editExtension(type)
      {
        const dialogRef = this.dialog.open(ExtensionComponent, {
          data: {'media_id':this.mediaDetails['id'],'type':type},
          disableClose: true,
          autoFocus: true,
          width: "30rem"
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadMediaHistory();
            this.loadMediaDetails();
        });  
      }

      editDirectory()
      {
        const dialogRef = this.dialog.open(DirectoryListComponent, {
          data: {'media_id':this.mediaDetails['id'],'type':'DIRECTORY-LISTING','fileUpload':this.mediaDetails['fileUpload']},
          disableClose: true,
          autoFocus: true,
          width: "60rem"
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadMediaDetails();
            this.loadMediaHistory();
        });  
      }

      directoryEdit(element)
      {
        const dialogRef = this.dialog.open(DirectoryConfirmComponent, {
          data: element,
          disableClose: true,
          autoFocus: true,
          width: "30rem"
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadMediaDetails();
        });
      }

      updateExtension()
      {
        this.mediaService.updateExtension(this.route.snapshot.params['id']).subscribe( data => {
          this.loadMediaDetails();
          this.loadMediaHistory();
        }); 
      }

}