import { Component, OnInit, Inject } from '@angular/core';
import { MediaService } from './../../_services/media.service';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute } from '@angular/router';
import { Media } from  './../../_models/media';

@Component({
    selector: 'app-media-view',
    templateUrl: './media-view.component.html',
})
export class MediaViewComponent implements OnInit {
    pageTitle:string ="Case Details";
    isLoading:boolean;
    mediaDetails : Media[] = [];
    tabItems = AppUtil.MediaTab();
    activeLink = 'Case Details';
    mediaModel = "none";
    mediaFieldShow:boolean;
    constructor(private mediaService: MediaService,
                private route: ActivatedRoute) {
    }
    ngOnInit(): void {
            this.loadMediaDetails();
    }

    loadMediaDetails()
    {
     
      //delete this.tabItems['Allot Job'];
        this.mediaService.getMedia(this.route.snapshot.params['id']).subscribe( data => {
            this.mediaDetails = data as any;
            if(this.mediaDetails['transfer_id'] !=null && this.mediaDetails['transfer_code'] ==null)
            {
              this.tabItems.splice(1);
            }
            this.mediaFieldShow = AppUtil.CheckMediaTypeFields(this.mediaDetails['media_type']);
            this.isLoading = true;
          });
                    
    }

    viewMediaDeails()
    {
      this.mediaModel = "block";
    }
    closeModel()
    {
      this.mediaModel = "none";
    }

}