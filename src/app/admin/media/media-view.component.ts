import { Component, OnInit, Inject } from '@angular/core';
import { MediaService } from './../../_services/media.service';
import { ActivatedRoute } from '@angular/router';
import { Media } from  './../../_models/media';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-media-view',
    templateUrl: './media-view.component.html',
})
export class MediaViewComponent implements OnInit {
    pageTitle:string ="Case Details";
    isLoading:boolean;
    mediaDetails : Media[] = [];
    mediaModel = "none";
    backEndUrl = environment.apiUrl.replace("/api", "") + "payment/";
    Printurl = environment.apiUrl.replace("/api", "");
    constructor(private mediaService: MediaService,
                private route: ActivatedRoute) {
    }
    ngOnInit(): void {
            this.loadMediaDetails();
    }

    loadMediaDetails()
    {
        this.mediaService.getMedia(this.route.snapshot.params['id']).subscribe( data => {
            this.mediaDetails = data as any;
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