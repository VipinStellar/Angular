import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Contact } from '../../_models/contact';
import { ContactService } from '../../_services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Permission } from '../../_helpers/permission';
import { ContactViewComponent } from './contact-view.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  providers:[Permission]
})
export class ContactComponent implements OnInit {

  countryList;
  stateList;
  ELEMENT_DATA: Contact[] = [];
  selected: Contact;
  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  sortOrder = 'asc';
  sortField = 'id';
  pageTitle = "Contact List";
  displayedColumns: string[] = ['first_name','last_name','email','action'];
  contactList: MatTableDataSource<Contact> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private contactService: ContactService,private router: Router, public dialog: MatDialog,
              public  permission:Permission) { }

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
    this.contactService.getcontactList(searchParams).subscribe(
      data => {
        let res = data as any;
        this.contactList.data = res.data;
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

  viewDetails(company) {
    const dialogRef = this.dialog.open(ContactViewComponent, {
      data: company,
      disableClose: true,
      autoFocus: true,
      width: "50rem"
    });
  }

}
