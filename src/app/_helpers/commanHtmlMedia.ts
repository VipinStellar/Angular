import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'mediaTable'})

export class mediaTable implements PipeTransform  {
  pipe = new DatePipe('en-US');
  constructor(private _sanitizer:DomSanitizer) { }

  transform(media):SafeHtml {
    let title = 'Deal Id';
    let dueTitle = 'Recovery Due Date';
    let due_date = (media['due_date'] == null)?'': this.pipe.transform(new Date(media['due_date']), 'mediumDate');
    if(media["job_id"] != null)
    {
        title = 'Job Id';
        media['deal_id'] = media['job_id'];
    }
    if(media['stage'] == 1 || media['stage'] == 2 || media['stage'] == 3)
    {
      dueTitle = 'Pre Inspection Due Date';
      due_date = (media['pre_due_date'] == null)?'': this.pipe.transform(new Date(media['pre_due_date']), 'mediumDate');
    }
    else if(media['stage'] == 4 || media['stage'] == 5 || media['stage'] == 6)
    {
      dueTitle = 'Inspection Due Date';
      due_date = (media['assessment_due_date'] == null)?'': this.pipe.transform(new Date(media['assessment_due_date']), 'mediumDate');
    }    

   let html ='<table class="table table-striped table-bordered responsive " style="background-color: #fff !important;">'+
            '<tr style="background-color: #f2f2f2 !important;"><th>Client Name</th><th>'+title+'</th><th>Media Type</th><th>Current Status</th><th>'+dueTitle+'</th></tr>'+
            '<tr><td><a href="/admin/contact?record='+media['zoho_contact_id']+'">'+media['customer_name']+'</a></td><td>'+media['deal_id']+'</td><td>'+media['media_type']+'</td><td>'+media['stageName']+'</td><td>'+due_date+'</td></tr></table>';
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  
}