import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Media } from  './../../_models/media';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html'
})
export class TabComponent implements OnInit {
 tabItems = AppUtil.MediaTab();
 activeLink:string;
  @Input() mediaDetails: Media;


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeLink = this.activatedRoute.snapshot.url.join().split(',')[1];
    if(this.mediaDetails['transfer_id'] !=null && this.mediaDetails['transfer_code'] ==null)
      this.tabItems.splice(1);
  }

}