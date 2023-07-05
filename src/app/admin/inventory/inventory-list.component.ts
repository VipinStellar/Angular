import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from './../../_models/inventory';
import { InventoryService} from './../../_services/inventory';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html'
})
export class InventoryListComponent implements OnInit {
    filterForm: FormGroup;
    ELEMENT_DATA: Inventory[] = [];
    selected: Inventory;
    totalRows = 0;
    pageSize = 10;
    currentPage = 0;
    pageSizeOptions: number[] = [10, 25, 100];
    sortOrder = 'desc';
    sortField = 'id';
    pageTitle = "Inventory List";
    filterArray = [{'filed':'inventory_type','label':'Inventory Type'},{'filed':'model_num','label':'Model No.'},{'filed':'serial_num','label':'Serial No.'},
                   {'filed':'pcb_num','label':'P.B.C No.'},{ 'filed':'interface','label':'Interface'},{'filed':'capacity','label':'Capacity'},
                   {'filed':'type','label':'Type'},{'filed':'rack_num','label':'Rack No.'},{'filed':'firmware','label':'Firmware'}];
    displayedColumns: string[] = ['inventory_type','model_num','serial_num', 'pcb_num','interface','firmware','capacity','type','rack_num','action'];
    mediaInList: MatTableDataSource<Inventory> = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    constructor(private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute,private inventoryService:InventoryService) {
      }
  ngOnInit(): void {
      this.filterForm = this.formBuilder.group({
      inventory_type:[],
      model_num:[],
      serial_num:[],
      pcb_num:[],
      interface:[],
      firmware:[],
      capacity:[],
      rack_num:[],
      type:[]
  });
  this.loadData();
  }

  loadData() {
     var searchParams = {};
     searchParams['page_no'] = this.currentPage + 1;
     searchParams['pageSize'] = this.pageSize;
     searchParams['order'] = this.sortOrder;
     searchParams['orderBy'] = this.sortField;
     searchParams['filter'] = this.filterForm.value;
     this.inventoryService.getInventoryList(searchParams).subscribe(
       data => {
         let res = data as any;
         this.mediaInList.data = res.data;
        this.totalRows = res.recordsTotal;
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

  get flterValue() { return this.filterForm.controls; }

reset()
{
    this.filterForm.reset();
    this.loadData();
}
}