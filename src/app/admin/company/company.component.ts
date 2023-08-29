import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Company } from './../../_models/company';
import { CompanyService } from './../../_services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from './../../_helpers/permission';
import { CompanyViewComponent } from './company-view.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  providers:[Permission]
})
export class CompanyComponent implements OnInit {

  countryList;
  stateList;
  ELEMENT_DATA: Company[] = [];
  selected: Company;
  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  sortOrder = 'asc';
  sortField = 'id';
  pageTitle = "Company List";
  displayedColumns: string[] = ['company_name','gst_number','status','action'];
  companyList: MatTableDataSource<Company> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private companyService: CompanyService,private router: Router, public dialog: MatDialog,
              public  permission:Permission,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.loadData();
  }

  
  loadData() {
    var searchParams = {};
    searchParams['page_no'] = this.currentPage + 1;
    searchParams['pageSize'] = this.pageSize;
    searchParams['order'] = this.sortOrder;
    searchParams['orderBy'] = this.sortField;
    this.isLoading = true;
    this.companyService.getcompanyList(searchParams).subscribe(
      data => {
        let res = data as any;
        this.companyList.data = res.data;
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

  viewDetails(company) {console.log(company);
    const dialogRef = this.dialog.open(CompanyViewComponent, {
      data: company,
      disableClose: true,
      autoFocus: true,
      width: "50rem"
    });
  }

}
