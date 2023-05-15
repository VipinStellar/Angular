import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'mediaTable'})

export class mediaTable implements PipeTransform  {
  pipe = new DatePipe('en-US');
  constructor(private _sanitizer:DomSanitizer) { }

  transform(media):SafeHtml {
    let title = 'Zoho Id';
    if(media["job_id"] != null)
    {
        title = 'Job Id';
        media['zoho_id'] = media['job_id'];
    }
    
    media['due_date'] = (media['due_date'] == null)?'': this.pipe.transform(new Date(media['due_date']), 'mediumDate');
   let html ='<table class="table table-striped table-bordered responsive " style="background-color: #fff !important;">'+
            '<tr style="background-color: #f2f2f2 !important;"><th>Client Name</th><th>'+title+'</th><th>Media Type</th><th>Current Status</th><th>Due Date</th></tr>'+
            '<tr><td>'+media['customer_name']+'</td><td>'+media['zoho_id']+'</td><td>'+media['media_type']+'</td><td>'+media['stageName']+'</td><td>'+media['due_date']+'</td></tr></table>';
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  
}