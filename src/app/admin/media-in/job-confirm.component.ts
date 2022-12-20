import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MediaIn } from './../../_models/mediaIn';
import { MediaInService  } from './../../_services/mediaIn.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUtil } from 'src/app/_helpers/app.util';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/_services/data.service';
@Component({
  selector: 'job-confirm',
  templateUrl: './job-confirm.component.html',
})


export class JobConfirmComponent implements OnInit {
    ELEMENT_DATA: MediaIn[] = [];
    selected: MediaIn;
    isLoading = false;
    totalRows = 0;
    pageSize = 10;
    currentPage = 0;
    pageSizeOptions: number[] = [10, 25, 100];
    sortOrder = 'desc';
    sortField = 'id';
    pageTitle = "Job Confirmation";
    displayedColumns: string[] = ['job_id','branch_id','media_type', 'customer_id','case_type','stage','last_updated'];
    mediaInList: MatTableDataSource<MediaIn> = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    assignedRole: [];
    currentUrl: string;
    isAsscessDenied: boolean;
    mediaDetails: MediaIn[] = [];
    status:[];
    branchList:[];
    loading:boolean;
    statusId=null;
    branchId=null;
    constructor(private dataService:DataService,private mediaInService: MediaInService,private router: Router, private route: ActivatedRoute) {
      }
    ngOnInit(): void {

        this.assignedRole = this.route.snapshot.data['profileResolver'];
        this.currentUrl = this.router.url.split('/')[2];
        this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'access', this.currentUrl);
        if (!this.isAsscessDenied)
          this.router.navigate(['admin/access-denied']);
          this.mediaInService.mediastatus('jobconfirm').subscribe( data => {
            this.status = data as any;
          }); 
          this.mediaInService.getAllBranch().subscribe( data => {
            this.branchList = data as any;
          });

          let dash = this.dataService.getDataByKey('mediaSearch');
      if(dash != undefined)
      {
        this.statusId = dash.status;
        this.branchId = dash.branch_id;
        this.dataService.setData('mediaSearch',undefined);
      }
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
        this.mediaInService.getJobConfirm(searchParams).subscribe(
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
  
  ViewDetails(row)
  {
    this.router.navigate(['admin/observation/'+row['id']]);
  }
}
