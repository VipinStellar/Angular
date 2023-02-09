import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Role } from './../../_models/role';
import { RoleService } from './../../_services/role.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from './../../_helpers/permission';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.sass'],
  providers:[Permission]
})
export class RoleComponent implements OnInit {

  ELEMENT_DATA: Role[] = [];
  selected: Role;
  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  sortOrder = 'asc';
  sortField = 'id';
  pageTitle = "Role";
  displayedColumns: string[] = ['id', 'role_name', 'action'];
  roleList: MatTableDataSource<Role> = new MatTableDataSource();
  term: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private roleService: RoleService, public dialog: MatDialog,
              public permission:Permission,private route: ActivatedRoute,private router: Router) { }

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
    this.roleService.getRoleList(searchParams).subscribe(
      data => {
        let res = data as any;
        this.roleList.data = res.data;
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

  openRole() {
    this.router.navigate(['/admin/role/add']);
  }

  editRole(data) {
    this.router.navigate(['/admin/role/edit/' + data.id]);
  }

}
