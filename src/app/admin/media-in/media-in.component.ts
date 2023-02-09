import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MediaIn } from './../../_models/mediaIn';
import { MediaInService  } from './../../_services/mediaIn.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUtil } from 'src/app/_helpers/app.util';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from './../../_services/data.service';

@Component({
  selector: 'app-media-in',
  templateUrl: './media-in.component.html',
  styleUrls: ['./media-in.component.sass']
})
export class MediaInComponent implements OnInit {

  ELEMENT_DATA: MediaIn[] = [];
  selected: MediaIn;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  sortOrder = 'desc';
  sortField = 'id';
  pageTitle = "Media In";
  displayedColumns: string[] = ['zoho_id','job_id', 'customer_id', 'branch_id','media_type','stage_name','transfer_id','created_on'];
  searchField = [{ value: 'zoho_id', name: 'Zoho Id' }, { value: 'customer_name', name: 'Client Name' }, { value: 'branch_id', name: 'Branch name' },
                 {value: 'media_type', name: 'Media Type'},{value: 'job_id', name: 'Job Id'}];
  term: string;
  searchfieldName: string;
  mediaInList: MatTableDataSource<MediaIn> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  branchList:[];
  status:[];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  statusId = null;
  mediaType  = AppUtil.getMediaType();
  selectedStatus  =null;
  selectedType :string;
  selectedBranch  =null;
  searchType:string;
  AddMediaStyle = "none";
  selectedMedia: null;
  selectedAddBranch:null
  constructor(private dataService:DataService,private mediaInService: MediaInService, public dialog: MatDialog,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {  
      this.mediaInService.mediastatus('all').subscribe( data => {
        this.status = data as any;
      }); 
      this.mediaInService.getAllBranch().subscribe( data => {
        this.branchList = data as any;
      }); 

      let dash = this.dataService.getDataByKey('mediaSearch');
      if(dash != undefined)
      {
        this.selectedStatus = dash.status;
        this.statusId = this.selectedStatus;
        this.selectedType = "branch_id";
        this.searchfieldName = this.selectedType;
        this.selectedBranch = dash.branch_id;
        this.term = dash.branch_id;
        this.searchType = dash.type;
        this.dataService.setData('mediaSearch',undefined);

      }
      this.loadData();
    
  }

  loadData() {

    var searchParams = {};
    searchParams['page_no'] = this.currentPage + 1;
    searchParams['pageSize'] = this.pageSize;
    searchParams['order'] = this.sortOrder;
    searchParams['orderBy'] = this.sortField;
    searchParams['term'] = this.term;
    searchParams['searchType'] = this.searchType;
    searchParams['status'] = this.statusId;
    searchParams['searchfieldName'] = this.searchfieldName;
    searchParams['startDate'] = this.range.controls['start'].value;
    searchParams['endDate'] = this.range.controls['end'].value;
    this.mediaInService.getMediaInList(searchParams).subscribe(
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

  selectOnChange(event) {
    this.searchfieldName = event.value;
    this.term = '';
  }

  dropDownChamge(event)
  {
    this.term = event.value;
  }

  statusChange(event)
  {
      this.statusId = event.value;
  }

  _search()
  {
    this.searchType = '';
    this.loadData();
  }

  reset()
  {
    this.selectedStatus = null;
    this.selectedType = '';
    this.selectedBranch = null;
    this.searchfieldName = '';
    this.term = '';
    this.searchType = '';
    this.statusId = null;
    this.range.controls['start'].reset();
    this.range.controls['end'].reset();
    this.loadData();
  }

  addMedia()
  {
    this.AddMediaStyle = "block";
  }

  SaveMedia()
  {
    if(this.selectedMedia != null && this.selectedAddBranch != null)
    {
      let dataToPost = {'media_type': this.selectedMedia,'branch_id' :this.selectedAddBranch};
      this.mediaInService.addDummyMedia(dataToPost).subscribe(
        data => {
          this.loadData();
          this.selectedMedia = null;
          this.selectedAddBranch = null;
          this.AddMediaStyle = "none";
        });

    }
    else
    {
      alert("Please Select Media Type And Branch");
    }
    
  }
  
  CloseMedia()
  {
    this.AddMediaStyle = "none";
  }

  selectMediaType(event)
  {
    this.selectedMedia = event.value;
  }

  selectBranchType(event)
  {
    this.selectedAddBranch  = event.value;
  }

  MediaIndata(media)
  {
    let dataToPost = {'id': media.id,'branch_name' :media.branch_name};
    this.mediaInService.updateDummyMedia(dataToPost).subscribe(
      data => {
        this.loadData();
      });
  }

}
