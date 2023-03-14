import { Component, OnInit, Inject } from '@angular/core';
import { MediaService } from './../../_services/media.service';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from  './../../_models/media';
import { MatDialog } from '@angular/material/dialog';
import { AllotChangeComponent } from './allot-change.component';
@Component({
    selector: 'app-media-allot',
    templateUrl: './media-allot.component.html',
})
export class MediaAllotComponent implements OnInit {
    mediaDetails : Media[] = [];
    tabItems = AppUtil.MediaTab();
    activeLink = 'Assign Job';
    _history: [];
    teamList:[];
    constructor(private mediaService: MediaService, private route: ActivatedRoute,
                public dialog: MatDialog) {}

    ngOnInit(): void {
        this.loadMediaDetails();
        this.loadMediaHistory();
        this.teamList = this.route.snapshot.data['teamList'];  
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

    changeUser()
    {
        const dialogRef = this.dialog.open(AllotChangeComponent, {
            data: {mediaId:this.mediaDetails['id'],'teamList':this.teamList},
            disableClose: true,
            autoFocus: true,
            width: "30rem"
          });
          dialogRef.afterClosed().subscribe(result => {
            this.loadMediaHistory();
          });
    }
}