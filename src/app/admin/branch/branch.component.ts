import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Role } from './../../_models/role';
import { BranchService } from './../../_services/branch.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BranchAddComponent } from './branch-add.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchviewComponent } from './branch-view.component';
import { AppUtil } from 'src/app/_helpers/app.util';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.sass']
})
export class BranchComponent implements OnInit {

  countryList;
  stateList;
  ELEMENT_DATA: Role[] = [];
  selected: Role;
  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  sortOrder = 'asc';
  sortField = 'id';
  pageTitle = "Branch";
  displayedColumns: string[] = ['id', 'branch_name','country_id','action'];
  branchList: MatTableDataSource<Role> = new MatTableDataSource();
  term: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  assignedRole: [];
  isAsscessDenied: boolean;
  currentUrl: string;
  constructor(private branchService: BranchService,private router: Router, public dialog: MatDialog,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url.split('/')[2];
    this.assignedRole = this.route.snapshot.data['profileResolver'];
    this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'access', this.currentUrl);
    if (!this.isAsscessDenied)
      this.router.navigate(['admin/access-denied']);
    this.loadData();
    this.countryList = this.route.snapshot.data['countryList'];
    this.stateList = this.route.snapshot.data['stateList'];
  }

  
  loadData() {
    var searchParams = {};
    searchParams['page_no'] = this.currentPage + 1;
    searchParams['pageSize'] = this.pageSize;
    searchParams['order'] = this.sortOrder;
    searchParams['orderBy'] = this.sortField;
    this.isLoading = true;
    this.branchService.getBranchList(searchParams).subscribe(
      data => {
        let res = data as any;
        this.branchList.data = res.data;
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

  editBranch(data)
  {
    const dialogRef = this.dialog.open(BranchAddComponent, {
      data: {'data':data,'countryList':this.countryList,'stateList':this.stateList},
      disableClose: true,
      autoFocus: true,
      width:"500px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  openBranch()
  {
    const dialogRef = this.dialog.open(BranchAddComponent, {
      data: {'data':[],'countryList':this.countryList,'stateList':this.stateList},
      disableClose: true,
      autoFocus: true,
      width:"500px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });

  }

  viewBranch(data)
  {
    const dialogRef = this.dialog.open(BranchviewComponent, {
      data:data,
      disableClose: true,
      autoFocus: true,
      width:"500px"
    });
  }

  _isAsscessDenied(type) {
    let isAccess = AppUtil._getPageAccess(this.assignedRole, type, this.currentUrl);
    if (isAccess)
      return true;
    else
      return false;
  }

}
