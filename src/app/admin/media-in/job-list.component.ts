import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MediaIn } from './../../_models/mediaIn';
import { MediaInService  } from './../../_services/mediaIn.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUtil } from 'src/app/_helpers/app.util';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
})
export class JobListComponent implements OnInit {

ELEMENT_DATA: MediaIn[] = [];
selected: MediaIn;
isLoading = false;
totalRows = 0;
pageSize = 10;
currentPage = 0;
pageSizeOptions: number[] = [10, 25, 100];
sortOrder = 'desc';
sortField = 'id';
pageTitle = "Job Status";
displayedColumns: string[] = ['zoho_id','job_id', 'customer_id', 'branch_id','media_type','jobStatus'];
mediaInList: MatTableDataSource<MediaIn> = new MatTableDataSource();
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator)
paginator!: MatPaginator;
branchList:[];
status:[];
statusId=null;
branchId=null;
constructor(private mediaInService: MediaInService, private route: ActivatedRoute,private router: Router,public dialog: MatDialog) { }
    ngOnInit(): void {
      this.mediaInService.mediastatus('all').subscribe( data => {
        this.status = data as any;
      }); 
      this.mediaInService.getAllBranch().subscribe( data => {
        this.branchList = data as any;
      }); 
      this.loadData();
    }

    loadData() {
        var searchParams = {};
        searchParams['page_no'] = this.currentPage + 1;
        searchParams['pageSize'] = this.pageSize;
        searchParams['order'] = this.sortOrder;
        searchParams['orderBy'] = this.sortField;
        searchParams['statusId'] = this.statusId;
        searchParams['branchId'] = this.branchId;
        this.isLoading = true;
        this.mediaInService.getJobList(searchParams).subscribe(
          data => {
            let res = data as any;
            this.mediaInList.data = res.data;
            this.totalRows = res.recordsTotal;
            this.isLoading = false;
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

  statusChange(event)
  {
      this.statusId = event.value;
  }

  branchChange(event)
  {
      this.branchId = event.value;
  }

  _search()
  {
    this.loadData();
  }

  reset()
  {
    this.statusId = null;
    this.branchId = null;
    this.loadData();
  }

  ChangeStatus(row)
  {
    this.router.navigate(['admin/job-status/'+row['id']]);
  }

}