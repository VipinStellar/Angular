import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Media } from './../../_models/media';
import { MediaService  } from './../../_services/media.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'transfer-list-app',
  templateUrl: './transfer-list.component.html',
})
export class TransferListComponent implements OnInit {

ELEMENT_DATA: Media[] = [];
selected: Media;
totalRows = 0;
pageSize = 10;
currentPage = 0;
pageSizeOptions: number[] = [10, 25, 100];
sortOrder = 'desc';
sortField = 'id';
pageTitle = "Job Status";
displayedColumns: string[] = ['zoho_id','job_id', 'customer_id', 'branch_id','new_branch_id','media_type','stage_name','action'];
mediaInList: MatTableDataSource<Media> = new MatTableDataSource();
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator)
paginator!: MatPaginator;
branchList:[];
branchId=null;
constructor(private mediaService: MediaService,public dialog: MatDialog,private toastrService: ToastrService) { }
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
        searchParams['branchId'] = this.branchId;
        this.mediaService.getJobList(searchParams).subscribe(
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

  branchChange(event)
  {
      this.branchId = event.value;
  }

  _search()
  {
    this.loadData();
  }

  reset()
  {
    this.branchId = null;
    this.loadData();
  }

  generateCode(media)
    {
        Swal.fire({
            title: 'Do Media in',
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: "#007bff",
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.value) {
              let apiToCall = this.mediaService.generateMediaCode(media.transfer_id);
              apiToCall.subscribe(
                data => {
                  this.toastrService.success('Media In successfully!', 'Success!');
                  this.loadData();
                }
              );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
      
            }
          });
    }

}