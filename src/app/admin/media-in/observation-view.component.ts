import { Component, OnInit, Inject } from '@angular/core';
import { MediaIn } from 'src/app/_models/mediaIn';
import { MediaInService } from './../../_services/mediaIn.service';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Recovery } from './recovery.component';
import { JobAllot } from './job-allot.component';
import { BrannchClone } from './branch-clone.component';
@Component({
    selector: 'app-observation',
    templateUrl: './observation-view.component.html',
})
export class ObservationView implements OnInit {
    mediaDetails: MediaIn[] = [];
    tabItems = AppUtil.getMediaRecoveryTab();
    activeLink = this.tabItems[1];
    observationHis: [];
    recoveryHis: [];
    allotHis:[];
    cloneHis:[];
    teamList: [];
    constructor(private mediaInService: MediaInService,private router: Router,public dialog: MatDialog,
                 private route: ActivatedRoute) {}    
    ngOnInit(): void {
        this.getMediaDetails();
        this._ObservationHis();
        this._recoveryHis();
        this._allotJobHis();
        this._branchCloneHis();
        this.teamList = this.route.snapshot.data['teamList'];
        
    }

    getMediaDetails()
    {
        this.mediaInService.getMedia(this.route.snapshot.params['id']).subscribe(data => {
            this.mediaDetails = data as any;
          });
    }

    _ObservationHis() {
        this.mediaInService.mediaHistory(this.route.snapshot.params['id'], 'edit','observation').subscribe(data => {
          this.observationHis = data as any;
        });
      }

      _recoveryHis() {
        this.mediaInService.mediaHistory(this.route.snapshot.params['id'], 'edit','recovery').subscribe(data => {
          this.recoveryHis = data as any;
        });
      }

      _allotJobHis() {
        this.mediaInService.mediaHistory(this.route.snapshot.params['id'], 'edit','allotJob').subscribe(data => {
          this.allotHis = data as any;
        });
      }

      _branchCloneHis()
      {
        this.mediaInService.mediaHistory(this.route.snapshot.params['id'], 'edit','branchClone').subscribe(data => {
          this.cloneHis = data as any;
        });
      }

      onchangetab(item)
      {
        if(item == 'Media Daily Status')
        this.router.navigate(['admin/daily-status/'+this.mediaDetails['id']]);
        else if(item == 'Case Details')
        this.router.navigate(['admin/observation-details/'+this.mediaDetails['id']]);
        else
        this.router.navigate(['admin/observation/'+this.mediaDetails['id']]);
      }

      editRecovery() {
        const dialogRef = this.dialog.open(Recovery, {
          data: this.mediaDetails['id'],
          disableClose: true,
          autoFocus: true,
          width: "60rem"
        });
        dialogRef.afterClosed().subscribe(result => {
              this._recoveryHis()
        });    
      }

      allotJob()
      {
        const dialogRef = this.dialog.open(JobAllot, {
          data: {mediaId:this.mediaDetails['id'],'teamList':this.teamList},
          disableClose: true,
          autoFocus: true,
          width: "30rem"
        });
        dialogRef.afterClosed().subscribe(result => {
              this._allotJobHis()
        }); 
      }

      branchClone()
      {
        const dialogRef = this.dialog.open(BrannchClone, {
          data: this.mediaDetails['id'],
          disableClose: true,
          autoFocus: true,
          width: "30rem"
        });
        dialogRef.afterClosed().subscribe(result => {
              this._branchCloneHis()
        }); 
      }

      
}