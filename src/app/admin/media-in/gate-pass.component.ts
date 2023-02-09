import { Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MediaIn } from './../../_models/mediaIn';
import { MediaInService  } from './../../_services/mediaIn.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {SelectionModel} from '@angular/cdk/collections';
import { environment } from 'src/environments/environment';
import { AppUtil } from 'src/app/_helpers/app.util';

@Component({
  selector: 'gate-pass',
  templateUrl: './gate-pass.component.html',
})

export class GatePassComponent implements OnInit {
    ELEMENT_DATA: MediaIn[] = [];
    selected: MediaIn;
    totalRows = 0;
    pageSize = 10;
    currentPage = 0;
    pageSizeOptions: number[] = [10, 25, 100];
    sortOrder = 'desc';
    sortField = 'id';
    pageTitle = "Gate Pass";
    displayedColumns: string[] = ['id','zoho_id','gatepass_no','branch_id','media_type', 'customer_id','case_type','preview'];
    gatePassList: MatTableDataSource<MediaIn> = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    submitted:boolean;
    dynamicButton:boolean;
    branchList:[];
    gatepass:FormGroup;
    AddGatePassStyle = "none";
    AddOtherAssets = "block";
    branchId=null;
    passType=null;
    selection = new SelectionModel<MediaIn>(true, []);
    GatePassPDF=environment.apiUrl.replace("/api", "")+"downloadpass/";

    constructor(private formBuilder: FormBuilder,private mediaInService: MediaInService,
                private toastrService:ToastrService,private cdRef : ChangeDetectorRef) {
     
    }

    ngOnInit(): void {
        this.loadData();
        this.mediaInService.getAllBranch().subscribe( data => {
          this.branchList = data as any;
        }); 
        this.loadformGatePass();
    }
    
    ngAfterViewChecked() {
      this.cdRef.detectChanges();
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
      });
    }

    loadData(){
        var searchParams = {};
        searchParams['page_no'] = this.currentPage + 1;
        searchParams['pageSize'] = this.pageSize;
        searchParams['order'] = this.sortOrder;
        searchParams['orderBy'] = this.sortField;
        searchParams['passType'] = this.passType;
        searchParams['branchId'] = this.branchId;
        this.mediaInService.getGatepassList(searchParams).subscribe(
          data => {
            let res = data as any;
            this.gatePassList.data = res.data;
            this.totalRows = res.recordsTotal;
          });
    }
    
    pageChanged(event: PageEvent){
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        this.loadData();
    }
    
    sortData(sort: Sort){
        this.sortField = sort.active;
        this.sortOrder = sort.direction == '' ? 'asc' : sort.direction;
        this.loadData();
    }
      
    branchChange(event){
        this.branchId = event.value;
    }

    passtypeChange(event){
        this.passType = event.value;
    }

    _search(){
      this.loadData();
    }

    reset(){
      this.passType = null;
      this.branchId = null;
      this.loadData();
    }
  
    addGatePass(){
      if((this.selection.selected.length) > 0){
        this.AddGatePassStyle='block';
        this.validateGatepass['transfer_id'].setValue(AppUtil.getObjtoId(this.selection.selected,'id'));
        for(let i= 0; i < (this.selection.selected.length); i++){
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
      apiToCall = this.mediaInService.saveGatePass(this.gatepass.value);
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
}
