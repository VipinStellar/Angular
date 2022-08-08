import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { User } from './../../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserAddComponent } from './user-add.component';
import { UserService } from './../../_services/user.service';
import { UseriewComponent } from './user-view.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AppUtil } from './../../_helpers/app.util'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent {
  constructor(private toastrService: ToastrService, private userService: UserService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }
  ELEMENT_DATA: User[] = [];
  selected: User;
  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  sortOrder = 'asc';
  sortField = 'id';
  pageTitle = "User";
  displayedColumns: string[] = ['emp_code', 'name', 'email', 'branch_name', 'role_name', 'action'];
  userList: MatTableDataSource<User> = new MatTableDataSource();
  term: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  searchField = [{ value: 'emp_code', name: 'Emp ID' }, { value: 'name', name: 'Name' }, { value: 'email', name: 'Email' }];
  searchfieldName: string;
  branchList: [];
  roleList: [];
  teamList: [];
  assignedRole: [];
  isAsscessDenied: boolean;
  currentUrl: string;
  ngOnInit(): void {
    this.currentUrl = this.router.url.split('/')[2];
    this.branchList = this.route.snapshot.data['branchList'];
    this.roleList = this.route.snapshot.data['roleList'];
    this.teamList = this.route.snapshot.data['teamList'];
    this.assignedRole = this.route.snapshot.data['profileResolver'];
    this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'access', this.currentUrl);
    if (!this.isAsscessDenied)
      this.router.navigate(['admin/access-denied']);
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
    this.userService.getUserList(searchParams).subscribe(
      data => {
        let res = data as any;
        this.userList.data = res.data;
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

  selectOnChange(event) {
    this.searchfieldName = event.value;
    this.term = '';
  }

  openUser() {
    const dialogRef = this.dialog.open(UserAddComponent, {
      data: { 'data': [], 'roleList': this.roleList, 'branchList': this.branchList,'teamList':this.teamList},
      disableClose: true,
      autoFocus: true,
      width: "700px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  editUser(user) {
    const dialogRef = this.dialog.open(UserAddComponent, {
      data: { 'data': user, 'roleList': this.roleList, 'branchList': this.branchList,'teamList':this.teamList},
      disableClose: true,
      autoFocus: true,
      width: "700px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  viewUser(user) {
    const dialogRef = this.dialog.open(UseriewComponent, {
      data: user,
      disableClose: true,
      autoFocus: true,
      width: "500px"
    });
  }

  deleteUser(user) {
    Swal.fire({
      title: 'Are you sure want to remove? ' + user.name,
      //text: 'You will not be able to recover this file!.',
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        let apiToCall = this.userService.deleteUser(user.id);
        apiToCall.subscribe(
          data => {
            this.toastrService.success('User delete successfully!', 'Success!');
            this.loadData();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
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
