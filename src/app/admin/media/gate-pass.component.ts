import { Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Media } from './../../_models/media';
import { MediaService  } from './../../_services/media.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gate-pass',
  templateUrl: './gate-pass.component.html',
})

export class GatePassComponent implements OnInit {
    ELEMENT_DATA: Media[] = [];
    selected: Media;
    totalRows = 0;
    pageSize = 10;
    currentPage = 0;
    pageSizeOptions: number[] = [10, 25, 100];
    sortOrder = 'desc';
    sortField = 'id';
    pageTitle = "Gate Pass";
    displayedColumns: string[] = ['deal_id','gatepass_no','branch_id','media_type', 'customer_id','case_type','createdon','preview'];
    gatePassList: MatTableDataSource<Media> = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    branchList:[];

    branchId=null;
    passType=null;
    GatePassPDF=environment.apiUrl.replace("/api", "")+"downloadpass/";
    jobIdUrl:string;
    constructor(private mediaService: MediaService,private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.loadData();
        this.mediaService.getAllBranch().subscribe( data => {
          this.branchList = data as any;
        }); 
    }
    
      loadData(){
        var searchParams = {};
        searchParams['page_no'] = this.currentPage + 1;
        searchParams['pageSize'] = this.pageSize;
        searchParams['order'] = this.sortOrder;
        searchParams['orderBy'] = this.sortField;
        searchParams['passType'] = this.passType;
        searchParams['branchId'] = this.branchId;
        searchParams['term'] = this.jobIdUrl;
        this.mediaService.getGatepassList(searchParams).subscribe(
          data => {
            let res = data as any;
            this.gatePassList.data = res.data;
            this.totalRows = res.recordsTotal;
          });
    }
    
    pageChanged(event: PageEvent){
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        this.loadData();
    }
    
    sortData(sort: Sort){
        this.sortField = sort.active;
        this.sortOrder = sort.direction == '' ? 'asc' : sort.direction;
        this.loadData();
    }
      
    branchChange(event){
        this.branchId = event.value;
    }

    passtypeChange(event){
        this.passType = event.value;
    }

    _search(){
      this.loadData();
    }

    reset(){
      this.passType = null;
      this.branchId = null;
      this.jobIdUrl = '';
      this.loadData();
    }
  
}
