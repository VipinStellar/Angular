import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Media } from 'src/app/_models/media';
import { MediaService  } from './../../_services/media.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthUser } from 'src/app/_models/authuser';
import { AccountService } from './../../_services/account.service';

@Component({
  selector: 'wiping-due-list',
  templateUrl: './wiping-due-list.component.html'
})
export class WipingDueList implements OnInit {
    pageTitle = "Wiping Due List";
    user: AuthUser;
    AddMediaStyle = "none";
    jobidfield=null;
    ELEMENT_DATA: Media[] = [];
    selected: Media;
    totalRows = 0;
    pageSize = 10;
    currentPage = 0;
    pageSizeOptions: number[] = [10, 25, 100];
    sortOrder = 'desc';
    sortField = 'id';
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    wipingDueList: MatTableDataSource<Media> = new MatTableDataSource();
    displayedColumns: string[] = ['job_id','assets_type','stage_name','media_in_date','action'];
    constructor(private mediaService: MediaService,public dialog: MatDialog,private accountService:AccountService){}
    ngOnInit(): void {
      this.user =  this.accountService.userValue;
        this.loadData();
  }

  loadData() {
    var searchParams = {};
    searchParams['page_no'] = this.currentPage + 1;
    searchParams['pageSize'] = this.pageSize;
    searchParams['order'] = this.sortOrder;
    searchParams['orderBy'] = this.sortField;
     this.mediaService.wipingduelist(searchParams).subscribe(
      data => {
        let res = data as any;
        this.wipingDueList.data = res.data;
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
 
  addDate(date:Date)
  {
    let result = new Date(date);
    result.setDate(result.getDate() + 7);
    return result;
  }

  wipingRequest(media_id)
  {
    this.mediaService.requestWiping(media_id).subscribe( data => {
      this.loadData();
    });
  }

}