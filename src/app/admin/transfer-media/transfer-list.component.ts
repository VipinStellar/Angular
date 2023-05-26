import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Media } from './../../_models/media';
import { MediaService  } from './../../_services/media.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import { AppUtil } from 'src/app/_helpers/app.util';
@Component({
  selector: 'transfer-list-app',
  templateUrl: './transfer-list.component.html',
})
export class TransferListComponent implements OnInit {

ELEMENT_DATA: Media[] = [];
totalRows = 0;
pageSize = 10;
currentPage = 0;
pageSizeOptions: number[] = [10, 25, 100];
sortOrder = 'desc';
sortField = 'id';
pageTitle = "Transfer Media";
displayedColumns: string[] = ['id','zoho_id','job_id', 'customer_id', 'branch_id','new_branch_id','media_type','assets_type','stage_name','action'];
mediaInList: MatTableDataSource<Media> = new MatTableDataSource();
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator)
paginator!: MatPaginator;
branchList:[];
branchId=null;
//////GatePass
submitted:boolean;
    dynamicButton:boolean;
    gatepass:FormGroup;
    AddGatePassStyle = "none";
    passType=null;
    selection = new SelectionModel<Media>(true, []);
    jobIdUrl:string;
    selectdMediaId:string[] = [];
////Media In Buttnn
MediaInStyle = 'none';
MediaPass:FormGroup;
constructor(private mediaService: MediaService,public dialog: MatDialog,private toastrService: ToastrService,
           private formBuilder: FormBuilder,private cdRef : ChangeDetectorRef) { }
    ngOnInit(): void {
         this.mediaService.getAllBranch().subscribe( data => {
        this.branchList = data as any;
      }); 
      this.loadData();
      this.loadformGatePass();
      this.mediaInpass();
    }

    ngAfterViewChecked() {
      this.cdRef.detectChanges();
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
  loadformGatePass(){
    this.gatepass = this.formBuilder.group({
        transfer_id: [],          
        gatepass_type: ['',[Validators.required]],
        expected_return_date:[],
        requester_deptt: ['',[Validators.required]],
        sender_name: ['',[Validators.required]],
        dispatch_branch_id: ['',[Validators.required]],
        client_address: [],
        dispatch_name: ['',[Validators.required]],
        remarks: ['',[Validators.required]],
        otherAssets: this.formBuilder.array([]),  
        transfer_mode: ['',[Validators.required]],
        ref_name_num: [],
        media_id:[],
    });
  }

  checkDuplicateBranchName(mediaArray)
  {
    let ss =  mediaArray.filter((item,index) => mediaArray.indexOf(item) === index);
      if(ss.length > 1)
      {
      this.cancelGatePass()
      this.toastrService.error('Single gate pass for different branch cant be created.', 'Error!');
      } 
  }

  addGatePass(){
    let temp = [] as any
    if((this.selection.selected.length) > 0){
      this.AddGatePassStyle='block';
      this.validateGatepass['transfer_id'].setValue(AppUtil.getObjtoId(this.selection.selected,'transferId'));
      for(let i= 0; i < (this.selection.selected.length); i++){
        if(this.selection.selected[i]['transfer_media_id'] != 'undefined')
        {
          this.selectdMediaId.push(this.selection.selected[i]['transfer_media_id']);
        }
        temp.push(this.selection.selected[i]['new_branch_id']);
        this.assets.push(
          this.formBuilder.group({
            only_assets:[false],
            only_media:[true],
            assets_job_id: [(this.selection.selected[i]['job_id'] !='' &&  this.selection.selected[i]['job_id'] != null)?this.selection.selected[i]['job_id']:this.selection.selected[i]['zoho_id']],
            assets_name: [],
            assets_description: [],  
          })
        );
      }
      this.checkDuplicateBranchName(temp);
    } else {
      this.toastrService.error('Please select atleast one check box in table for create gate pass', 'Error!');
    }
    
  }

  get validateGatepass() { return this.gatepass.controls; }
  get assets() { return this.validateGatepass['otherAssets'] as FormArray; }
   
  saveGatePass(){
    this.submitted = true;
    if (this.gatepass.invalid) {
        return false;
    }
    for(let j = 0; j < (this.assets.length); j++){
      if((this.assets.value[j].only_media == false) && (this.assets.value[j].only_assets == false)){
          this.toastrService.error('Please select atleast one check box Media or Other Assets in Job ID - '+this.assets.controls[j]['controls'].assets_job_id.value, 'Error!');
          return false;
      }
    }
    
    let apiToCall: any;
    this.validateGatepass['media_id'].setValue(this.selectdMediaId);
    apiToCall = this.mediaService.saveGatePass(this.gatepass.value);
    apiToCall.subscribe(
        data => {
            this.cancelGatePass();
            this.loadData();
            this.toastrService.success('Gate Pass Created successfully!', 'Success!');
        },
        error=>{
            console.log(error)
        }
    );
  }

  cancelGatePass(){
    this.submitted = false;
    this.AddGatePassStyle='none';
    this.gatepass.reset();
    this.assets.controls.length=0;
    this.selection.clear();
    this.selectdMediaId = [];
  }

  checkGatepassType(event){
    if(event.value == 'Returnable'){
      this.validateGatepass['expected_return_date'].setValidators([Validators.required]);
    }else{
      this.validateGatepass['expected_return_date'].clearValidators();
      this.validateGatepass['expected_return_date'].updateValueAndValidity();
    }
  }

  checkDispatchBranch(event){
    if(event.value == 0){
      this.validateGatepass['client_address'].setValidators([Validators.required]);
    }else{
      this.validateGatepass['client_address'].clearValidators();
      this.validateGatepass['client_address'].updateValueAndValidity();
    }
  }

  showAssets(event,i){
    if(event.target.checked){
      this.assets.controls[i]['controls'].assets_name.setValidators([Validators.required]);
      this.assets.controls[i]['controls'].assets_description.setValidators([Validators.required]);
    }else{
      this.assets.controls[i]['controls'].assets_name.clearValidators();
      this.assets.controls[i]['controls'].assets_name.updateValueAndValidity();
      this.assets.controls[i]['controls'].assets_description.clearValidators();
      this.assets.controls[i]['controls'].assets_description.updateValueAndValidity();
    }
  }

  generateCode(media)
    {
      if(media.getpassId != null && media.ref_name != null)
      {
        Swal.fire({
            title: 'Do Media in',icon: 'warning',allowOutsideClick: false,showCancelButton: true,
            confirmButtonColor: "#007bff",confirmButtonText: 'Yes',cancelButtonText: 'No',}).then((result) => {
            if (result.value) {
              let apiToCall = this.mediaService.generateMediaCode(media.transferId);
              apiToCall.subscribe(
                data => {
                  this.toastrService.success('Media In successfully!', 'Success!');
                  this.loadData();
                }
              );
            } 
          });
    }
    else
    {
        this.MediaInStyle = 'block';
        this.fg['id'].setValue(media.getpassId);
        this.fg['transfer_id'].setValue(media.transferId);
    }
  }

  mediaInpass(){
    this.MediaPass = this.formBuilder.group({
        ref_name_num: ['',[Validators.required]],
        id:[],
        transfer_id:[]
    });
  }

  get fg() { return this.MediaPass.controls; }

  saveMediapass(){
    this.submitted = true;
      if (this.MediaPass.invalid) {
          return false;
      }
      let apiToCall: any;
      apiToCall = this.mediaService.updateGatePassRef(this.MediaPass.value);
      apiToCall.subscribe(
          data => {
              this.cancelMediapass();
              this.loadData();
              this.toastrService.success('Gate Pass Created successfully!', 'Success!');
          },
          error=>{
              console.log(error)
          }
      );
  }

  cancelMediapass(){
    this.submitted = false;
    this.MediaInStyle='none';
    this.MediaPass.reset();
  }

  
}