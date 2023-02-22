import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'mediaTable'})

export class mediaTable implements PipeTransform  {

  constructor(private _sanitizer:DomSanitizer) { }

  transform(media):SafeHtml {
    let title = 'Zoho Id';
    if(media["job_id"] != null)
    {
        title = 'Job Id';
        media['zoho_id'] = media['job_id'];
    }
   let html ='<table class="table table-striped table-bordered responsive " style="background-color: #fff !important;">'+
            '<tr><th>Client Name</th><th>'+title+'</th><th>Media Type</th></tr>'+
            '<tr><td>'+media['customer_name']+'</td><td>'+media['zoho_id']+'</td><td>'+media['media_type']+'</td></tr></table>';
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  
}