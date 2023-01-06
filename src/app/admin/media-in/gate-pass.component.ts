import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MediaIn } from './../../_models/mediaIn';
import { MediaInService  } from './../../_services/mediaIn.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/_services/data.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'gate-pass',
  templateUrl: './gate-pass.component.html',
})


export class GatePassComponent implements OnInit {
    ELEMENT_DATA: MediaIn[] = [];
    selected: MediaIn;
    isLoading = false;
    totalRows = 0;
    pageSize = 10;
    currentPage = 0;
    pageSizeOptions: number[] = [10, 25, 100];
    sortOrder = 'desc';
    sortField = 'id';
    pageTitle = "Gate Pass";
    displayedColumns: string[] = ['zoho_id','branch_id','media_type', 'customer_id','case_type','stage','preview'];
    gatePassList: MatTableDataSource<MediaIn> = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    loading:boolean;
    submitted:boolean;
    branchList:[];
    gatepass:FormGroup;
    AddGatePassStyle = "none";
    GatePassPDF=environment.apiUrl.replace("/api", "")+"downloadpass/";
    //loading:false;
    
    constructor(private formBuilder: FormBuilder,private dataService:DataService,
                    private mediaInService: MediaInService,private toastrService:ToastrService,
                    private router: Router, private route: ActivatedRoute) {
     
    }
    ngOnInit(): void {
        this.loadData();
       this.loadformGatePas();
    }

    loadformGatePas()
    {
              this.gatepass = this.formBuilder.group({  
              transfer_id: [],          
              gatepass_type: ['',[Validators.required]],
              expected_return_date:[],
              requester_deppt: ['',[Validators.required]],
              requester_name: ['',[Validators.required]],
              dispatch_branch_id: ['',[Validators.required]],
              dispatch_name: ['',[Validators.required]]
         });
    }

    loadData() {
        var searchParams = {};
        searchParams['page_no'] = this.currentPage + 1;
        searchParams['pageSize'] = this.pageSize;
        searchParams['order'] = this.sortOrder;
        searchParams['orderBy'] = this.sortField;
        this.isLoading = true;
        this.mediaInService.getGatepassList(searchParams).subscribe(
          data => {
            let res = data as any;
            this.gatePassList.data = res.data;
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
      
    
  
  addGatePass(row)
  {
    this.mediaInService.getAllBranch().subscribe( data => {
      this.branchList = data as any;
      }); 
    this.AddGatePassStyle='block';
    this.validateGatepass['transfer_id'].setValue(row.id);
  }

  get validateGatepass() { return this.gatepass.controls; }

  saveGatePass(){
     this.submitted = true;
     if (this.gatepass.invalid) {
         return false;
     }
     console.log(this.gatepass.value);
     this.loading = true;
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
    this.AddGatePassStyle='none';
    this.gatepass.reset();
  }
  
}
