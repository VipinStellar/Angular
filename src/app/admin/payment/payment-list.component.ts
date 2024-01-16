import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Payment } from '../../_models/payment';
import { PaymentService  } from '../../_services/payment.service';
import { MediaService } from 'src/app/_services/media.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentViewComponent } from './payment-view.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.sass']
})
export class PaymentListComponent implements OnInit {
  ELEMENT_DATA: Payment[] = [];
  selected: Payment;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  sortOrder = 'desc';
  sortField = 'id';
  pageTitle = "Payment List";
  displayedColumns: string[] = ['sr_no','job_id', 'firstname','phone','payment_amount','order_no','invoice_no','payment_timestamp','action'];
  searchField = [{value:'firstname',name:'Client Name'},{ value: 'job_id', name: 'Job ID' }, {value: 'email', name: 'Email'}, {value: 'phone', name: 'Phone'}, {value: 'payment_txnid', name: 'Txn ID'},{value: 'order_no', name: 'Order NO'},{value: 'invoice_no', name: 'Invoice No'},{ value: 'branch_id', name: 'Branch name' }];
  term: string;
  searchfieldName: string;
  paymentList: MatTableDataSource<Payment> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  branchList:[];
  selectedType :string;
  selectedBranch  =null;
  constructor(private toastrService:ToastrService,private mediaService:MediaService, private paymentService:PaymentService, public dialog: MatDialog){}
  ngOnInit(): void {
    this.mediaService.getAllBranch().subscribe( data => {
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
    searchParams['term'] = this.term;
    searchParams['searchfieldName'] = this.searchfieldName;
    searchParams['startDate'] = this.range.controls['start'].value;
    searchParams['endDate'] = this.range.controls['end'].value;
    this.paymentService.getPaymentDetails(searchParams).subscribe(
      data => {
        let res = data as any;
        this.paymentList.data = res.data;
        this.totalRows = res.recordsTotal;
      });
  }
  sortData(sort: Sort) {
    this.sortField = sort.active;
    this.sortOrder = sort.direction == '' ? 'asc' : sort.direction;
    this.loadData();
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }
  selectOnChange(event) {
    this.searchfieldName = event.value;
    this.term = '';
  }
  dropDownChamge(event)
  {
    this.term = event.value;
  }
  _search()
  {
    this.loadData();
  }

  reset()
  {
    this.selectedType = '';
    this.selectedBranch = null;
    this.searchfieldName = '';
    this.term = '';
    this.range.controls['start'].reset();
    this.range.controls['end'].reset();
    this.loadData();
  }
  viewTxnDetails(details){
    const dialogRef = this.dialog.open(PaymentViewComponent, {
      data: details,
      disableClose: true,
      autoFocus: true,
      width: "700px"
    });
  }

  generateIrn(item){
    this.paymentService.generateIrn(item['invoiceId']).subscribe(data => {
      let result = data as any; 
      if(result['irn_status']==1)
        this.toastrService.success(result['irn_msg'], 'Success!');
      else
        this.toastrService.error(result['irn_msg'], 'Error!');

        this.loadData();
    });
  }
}
