import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Media } from 'src/app/_models/media';
import { MediaService  } from './../../_services/media.service';
import { WipingEditComponent } from './wiping-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthUser } from 'src/app/_models/authuser';
import { AccountService } from './../../_services/account.service';

@Component({
  selector: 'wiping-list',
  templateUrl: './wiping-list.component.html'
})
export class WipingList implements OnInit {
    pageTitle = "Wiping List";
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
    wipingList: MatTableDataSource<Media> = new MatTableDataSource();
    displayedColumns: string[] = ['job_id', 'customer_id','media_type','stage_name','request_wiping_date','expected_wiping_date','approve_wiping_date','name','action'];
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
     this.mediaService.wipinglist(searchParams).subscribe(
      data => {
        let res = data as any;
        this.wipingList.data = res.data;
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


  updateWiping(row)
    {
      const dialogRef = this.dialog.open(WipingEditComponent, {
        data: row,
        disableClose: true,
        autoFocus: true,
        width: "25rem"
      });
      dialogRef.afterClosed().subscribe(result => {
        this.loadData();
      });
    }

    CloseMedia()
    {
      this.AddMediaStyle = "none";
      this.jobidfield = null;
    }

    addMedia()
    {
      this.AddMediaStyle = "block";
    }

    SaveMedia()
    {
      if(this.jobidfield != null && this.jobidfield != undefined)
    {
      let dataToPost = {'job_id': this.jobidfield};
      this.mediaService.addDummyWiping(dataToPost).subscribe(
        data => {
          this.loadData();
          this.CloseMedia();
        });
    }
    else
    {
        alert("Please Enter Job Id");
    }
       
    }

 
}