import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Contact } from '../../_models/contact';
import { ContactService } from '../../_services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { Permission } from '../../_helpers/permission';
import { ContactViewComponent } from './contact-view.component';
import { ContactEditComponent } from './contact-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
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
  sortOrder = 'desc';
  sortField = 'id';
  pageTitle = "Contact List";
  searchfieldName: string;
  selectedType :string;
  term: string;
  displayedColumns: string[] = ['zoho_contact_id','customer_name','email','company_name','branch_name','use_billing_address','action'];
  searchField = [{ value: 'zoho_contact_id', name: 'Record ID' },{ value: 'customer_name', name: 'Customer Name' },{value: 'email', name: 'Email'},  {value: 'company_name', name: 'Company Name'},{value: 'branch_name', name: 'Branch Name'}];
  contactList: MatTableDataSource<Contact> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private contactService: ContactService,private router: Router, public dialog: MatDialog,
              public  permission:Permission,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['record'] != undefined && params['record'] !='' && params['record'] !='')
      {
        this.selectedType = "zoho_contact_id";
        this.searchfieldName = 'zoho_contact_id'
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
    this.contactService.getcontactList(searchParams).subscribe(
      data => {
        let res = data as any;
        this.contactList.data = res.data;
        this.totalRows = res.recordsTotal;
        this.isLoading = false;
      });

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

  viewDetails(contact) {
    const dialogRef = this.dialog.open(ContactViewComponent, {
      data: contact,
      disableClose: true,
      autoFocus: true,
      width: "50rem"
    });
  }

  editDetails(contact)
  {
    contact['ButtonName'] = "Save";
    contact['TitleName'] = "Edit Contact";
    const dialogRef = this.dialog.open(ContactEditComponent, {
      data: contact,
      disableClose: true,
      autoFocus: true,
      width: "50rem"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
  }); 
  }

}
