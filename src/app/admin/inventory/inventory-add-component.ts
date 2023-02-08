import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Inventory } from 'src/app/_models/inventory';
import { Location } from '@angular/common';
import {InventoryService} from './../../_services/inventory';
import { MediaInService } from 'src/app/_services/mediaIn.service';
@Component({
    selector: 'inventory-add',
    templateUrl: './inventory-add-component.html',
})
export class InventoryAddComponent implements OnInit {
    pageTitle: string = "Add Item";
    inventoryDetails: Inventory[] = [];
    inventoryForm: FormGroup;
    submitted:boolean;
    isEdit:boolean;
    branchList:[];
    constructor(private toastrService: ToastrService,
                private formBuilder: FormBuilder,
                private router: Router, 
                private route: ActivatedRoute,
                private _location: Location,
                private mediaInService: MediaInService,
                private inventoryService:InventoryService) {
                    if(this.router.url.indexOf("/edit/") != -1){
                        this.isEdit = true;
                        this.pageTitle = "Edit Item";
                      }
                }  
    ngOnInit(): void {
        this.mediaInService.getAllBranch().subscribe( data => {
            this.branchList = data as any;
          }); 
        this.loadForm();
        if(this.isEdit)
        {
            this.inventoryService.fatchInventory(this.route.snapshot.params['id']).subscribe( data => {
             this.modelToForm(data as any);
            });       
        }
    }

    modelToForm(data)
    {
        let capacity = data.capacity.split(" ");
        this.inventoryForm.setValue({
            id: data.id,
            model_num:data.model_num,
            serial_num:data.serial_num,
            pcb_num:data.pcb_num,
            interface:data.interface,
            firmware:data.firmware,
            date_purchase:data.date_purchase,
            type:data.type,
            rack_num:data.rack_num,
            inventory_type:data.inventory_type,
            size:capacity[1],
            numsize:capacity[0],
            received_from:data.received_from,
            branch_id:data.branch_id,
            job_id:data.job_id,
            remarks:data.remarks
        });
    }

    loadForm()
    {
        this.inventoryForm = this.formBuilder.group({
            id:[],  
            model_num:['',[Validators.required]],        
            serial_num : ['',[Validators.required]],
            pcb_num : ['',[Validators.required]],
            interface : ['',[Validators.required]],
            firmware : [''],
            date_purchase : [],
            size : ['',[Validators.required]],
            numsize : ['',[Validators.required]],
            type : ['',[Validators.required]],
            rack_num : ['',[Validators.required]],
            inventory_type : ['',[Validators.required]],
            received_from:[],
            branch_id:[],
            job_id:[],
            remarks:['',[Validators.required]]
          });
    }

    get Invalidate() { return this.inventoryForm.controls; }

    cancel()
    {
        this._location.back();
    }

    onSubmit()
    {
        this.submitted = true;
        if (this.inventoryForm.invalid) {
            return false;
        }
        let apiToCall: any;
        apiToCall = this.inventoryService.updateInventory(this.inventoryForm.value);
        apiToCall.subscribe(
            data => {                
                this.toastrService.success('Details Saved successfully!', 'Success!');
                this._location.back();
            },
            error => {
                let serverResponse = error.error;
                for (var key in serverResponse) {
                    if (serverResponse[key] === "Unauthorized")
                        this.toastrService.error('Bad Credentials!', 'Error!');
                    else
                        this.Invalidate[key].setErrors({ 'message': serverResponse[key] });
                }
            }
        );
    }
}