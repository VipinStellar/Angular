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
import { CopyDataComponent } from './copy-data.component';
import {RequestMediaOutComponenet }  from './request-media-out.component';
import { ResponceMediaOutComponenet } from './responce-media-out.component';
import { StatusUpdateComponent } from './status-update.component';
import { ExtensionUpdateComponent } from './extension-update.component';
import { ClientSatisfiedComponent } from './client-satisfied.component';
import { ReworkComponent } from './rework.component';
import { PreviewData } from './preview-data.component';
import { SendMediaClient } from './send-media-client.component';
import { AppUtil } from 'src/app/_helpers/app.util';
import { NotityTechnicianComponent } from './notify-technician.component';
@Component({
    selector: 'app-media-process',
    templateUrl: './media-process.component.html',
})
export class MediaJobProcessComponent implements OnInit {
    mediaDetails : Media[] = [];
    _history:[];
    user: AuthUser;
    recListShow:boolean = false;
    showStatusButton:boolean;
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
            this.showStatusButtons(this.mediaDetails);
            if(this.mediaDetails['stage'] > 7 )
            this.recListShow = true;
          });                    
    }

    showStatusButtons(data)
    {
     let status =  AppUtil.getStatus(data);
     if(status.length !=0)
      this.showStatusButton = true
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

      notifyTech()
      {
        const dialogRef = this.dialog.open(NotityTechnicianComponent, {
          data: this.mediaDetails,
          disableClose: true,
          autoFocus: true,
          width: "30rem"
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadMediaHistory();
        });
      }

      updateExtension(type)
      {
        const dialogRef = this.dialog.open(ExtensionUpdateComponent, {
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

      dataOutRequest(element,type)
      {
        element['reqType']= type
        const dialogRef = this.dialog.open(CopyDataComponent, {
          data: element,
          disableClose: true,
          autoFocus: true,
          width: "45rem"
        });
        dialogRef.afterClosed().subscribe(result => {
          this.loadMediaDetails();
          this.loadMediaHistory();
        });
      }

      mediaOutRequest()
      {
        const dialogRef = this.dialog.open(RequestMediaOutComponenet, {
          data: this.mediaDetails,
          disableClose: true,
          autoFocus: true,
          width: "45rem"
        });
        dialogRef.afterClosed().subscribe(result => {
          this.loadMediaDetails();
          this.loadMediaHistory();
        });
      }

      mediaOutResponce(row)
      {
        const dialogRef = this.dialog.open(ResponceMediaOutComponenet, {
          data: row,
          disableClose: true,
          autoFocus: true,
          width: "45rem"
        });
        dialogRef.afterClosed().subscribe(result => {
          this.loadMediaDetails();
          this.loadMediaHistory();
        });
      }

      statusUpdate()
      {
        const dialogRef = this.dialog.open(StatusUpdateComponent, {
          data: this.mediaDetails,
          disableClose: true,
          autoFocus: true,
          width: "45rem"
        });
        dialogRef.afterClosed().subscribe(result => {
          this.loadMediaDetails();
          this.loadMediaHistory();
        });
      }

      extensionButton(userId,stage)
      {
        if(userId == this.user.id && (stage ==4 || stage ==5 ||stage == 9 ||stage == 22 ))
        return true
        else 
        return false
      }
      
      editButton(type,userId,stage)
      {
        
        if(type == 'Pre-Inspection' && userId == this.user.id && (stage ==1 || stage == 2) && this.user.role_id != 10)
        {
            return true;
        }
        else if(type == 'Inspection' && userId == this.user.id && (stage ==4 || stage == 5) && this.user.role_id != 10)
        {
          return true;
        }
        else if(type == 'Recovery' && userId == this.user.id && (stage ==9 || stage == 22) && this.user.role_id != 10)
        {
          return true;
        }
        else if(type == 'DLCONFIRM' && userId == this.user.id && stage !=10 && stage !=7 &&  stage != 14 &&  stage != 15 && this.user.role_id != 10)
        {
          return true;
        }
        else if(type == 'MEDIAOUT' && userId == this.user.id && this.user.role_id == 10 && this.mediaDetails['MediaClientOut'] ==null && (stage == 7 || stage == 10 || stage == 14 || stage == 15 || stage == 16 || stage == 22) )
        {
            return true;
        }
        else
        {
          return false;
        }
      }


  clientDataSatisfy()
  {
    const dialogRef = this.dialog.open(ClientSatisfiedComponent, {
      data: this.mediaDetails,
      disableClose: true,
      autoFocus: true,
      width: "45rem"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadMediaDetails();
      this.loadMediaHistory();
    });
  }

  reworkEdit()
  {
    const dialogRef = this.dialog.open(ReworkComponent, {
      data: this.mediaDetails['Directory_Listing'],
      disableClose: true,
      autoFocus: true,
      width: "45rem"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadMediaDetails();
      this.loadMediaHistory();
    });
  }

  ViewDlDetails()
  {
    const dialogRef = this.dialog.open(PreviewData, {
      data: this.mediaDetails,
      disableClose: true,
      autoFocus: true,
      width: "65rem"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadMediaDetails();
      this.loadMediaHistory();
    });

  }

  mediaOutForClient()
  {
    const dialogRef = this.dialog.open(SendMediaClient, {
      data: this.mediaDetails,
      disableClose: true,
      autoFocus: true,
      width: "45rem"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadMediaDetails();
      this.loadMediaHistory();
    });
  }

}