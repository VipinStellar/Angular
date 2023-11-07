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
import { CompanyEditComponent } from './company-edit.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  providers:[Permission]
})
export class CompanyComponent implements OnInit {
  stateList;
  ELEMENT_DATA: Company[] = [];
  selected: Company;
  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  sortOrder = 'desc';
  sortField = 'id';
  pageTitle = "Company List";
  displayedColumns: string[] = ['zoho_company_id','company_name','gst_number','branch_name','action'];
  searchfieldName: string;
  selectedType :string;
  term: string;
  searchField = [{value:'zoho_company_id',name:'Record ID'},{value: 'company_name', name: 'Company Name'},{value: 'gst_number', name: 'Gst Number'},{value: 'branch_name', name: 'Branch Name'}];
  companyList: MatTableDataSource<Company> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private companyService: CompanyService,private router: Router, public dialog: MatDialog,
              public  permission:Permission,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.stateList = this.route.snapshot.data['stateList'];
    this.route.queryParams.subscribe(params => {
      if(params['record'] != undefined && params['record'] !='' && params['record'] !='')
      {
        this.selectedType = "zoho_company_id";
        this.searchfieldName = 'zoho_company_id'
        this.term = params['record'];
      }
    });
    this.loadData();
  }

  
  loadData() {
    var searchParams = {};
    searchParams['page_no'] = this.currentPage + 1;
    searchParams['pageSize'] = this.pageSize;
    searchParams['order'] = this.sortOrder;
    searchParams['orderBy'] = this.sortField;
    searchParams['term'] = this.term;
    searchParams['searchfieldName'] = this.searchfieldName;
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

  _search()
  {
    this.loadData();
  }

  reset()
  {
    this.router.navigate([], {
      queryParams: {
        'record': null,
      },
      queryParamsHandling: 'merge'
    })
    this.selectedType = '';
    this.searchfieldName = '';
    this.term = '';
    this.loadData();
  }

  selectOnChange(event) {
    this.searchfieldName = event.value;
    this.term = '';
  }

  viewDetails(company) {
    const dialogRef = this.dialog.open(CompanyViewComponent, {
      data: company,
      disableClose: true,
      autoFocus: true,
      width: "50rem"
    });
  }

  EditDetails(company)
  {
    const dialogRef = this.dialog.open(CompanyEditComponent, {
      data: [company,this.stateList[0]],
      disableClose: true,
      autoFocus: true,
      width: "50rem"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
  }); 
  }

}
