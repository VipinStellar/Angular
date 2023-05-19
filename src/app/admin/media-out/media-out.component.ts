import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Media } from 'src/app/_models/media';
import { MediaService  } from './../../_services/media.service';
@Component({
  selector: 'media-out',
  templateUrl: './media-out.component.html'
})
export class MediaOutComponent implements OnInit {
    ELEMENT_DATA: Media[] = [];
    selected: Media;
    totalRows = 0;
    pageSize = 10;
    currentPage = 0;
    pageSizeOptions: number[] = [10, 25, 100];
    sortOrder = 'desc';
    sortField = 'id';
    pageTitle = "Media Out List";
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    mediaList: MatTableDataSource<Media> = new MatTableDataSource();
    displayedColumns: string[] = ['zoho_id','job_id', 'customer_id', 'branch_id','media_type','stage_name'];
    constructor(private mediaService: MediaService){}
    ngOnInit(): void {
        this.loadData();
  }

  loadData() {
    var searchParams = {};
    searchParams['page_no'] = this.currentPage + 1;
    searchParams['pageSize'] = this.pageSize;
    searchParams['order'] = this.sortOrder;
    searchParams['orderBy'] = this.sortField;
     this.mediaService.getMediaOutList(searchParams).subscribe(
      data => {
        let res = data as any;
        this.mediaList.data = res.data;
        this.totalRows = res.recordsTotal;
      });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  sortData(sort: Sort) {
    this.sortField = sort.active;
    this.sortOrder = sort.direction == '' ? 'asc' : sort.direction;
    this.loadData();
  }



 
}