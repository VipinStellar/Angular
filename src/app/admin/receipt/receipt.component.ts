import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Receipt } from './../../_models/receipt';
import { ReceiptService } from './../../_services/receipt.service';

@Component({
  selector: 'receipt-app',
  templateUrl: './receipt.component.html',
})
export class ReceiptComponent implements OnInit {
  stateList;
  ELEMENT_DATA: Receipt[] = [];
  selected: Receipt;
  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  sortOrder = 'desc';
  sortField = 'id';
  pageTitle = "Reciept List";
  displayedColumns: string[] = ['job_id','receipt_num','branch_name','invoice_no','received_amount','tds_amount','payment_mode','action'];
  searchfieldName: string;
  selectedType :string;
  term: string;
  searchField = [{value: 'job_id', name: 'Job Id'},{value:'invoice_no',name:'Invoice No'},{value:'receipt_num',name:'Receipt No.'},{value: 'branch_name', name: 'Branch Name'},{value: 'received_amount', name: 'Received Amount'},{value: 'tds_amount', name: 'TDS Amount'},{value: 'payment_mode', name: 'Payment Mode'}];
  recieptList: MatTableDataSource<Receipt> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private receiptService: ReceiptService) { }

  ngOnInit(): void {
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
    this.receiptService.list(searchParams).subscribe(
      data => {
        let res = data as any;
        this.recieptList.data = res.data;
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
     this.selectedType = '';
    this.searchfieldName = '';
    this.term = '';
    this.loadData();
  }

  selectOnChange(event) {
    this.searchfieldName = event.value;
    this.term = '';
  }

}
