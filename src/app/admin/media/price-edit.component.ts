import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder , FormArray } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RecoveryService } from './../../_services/recovery.service';
@Component({
    selector: 'app-price-edit',
    templateUrl: './price-edit.component.html',
})
export class PriceEditComponent implements OnInit {   
    diaTitle: string;
    dataset:[];
    constructor(private fb: FormBuilder,
        private toastrService: ToastrService,
        private recoveryService:RecoveryService,
        private dialogRef: MatDialogRef<PriceEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'Edit Recovery Charges';
        }
        priceForm = this.fb.group({
            tax:[(this.data['tax_applicable']==1)?true:false],
            dataset: this.fb.array([])
          });
        
          get documentsControl(): FormArray {
            return this.priceForm.get("dataset") as FormArray;
          }
    ngOnInit(): void {
        this.dataset = this.data['price'];
        this.dataset.forEach(document =>
            this.documentsControl.push(
              this.fb.group({
                id: [document['id']],
                plan_type: [document['plan_type']],
                additional_charges: [document['additional_charges']],
                plan_amount: [document['plan_amount']],
                advance_percent: [document['advance_percent']],
                total_fee: [document['total_fee']],
                advance_amount: [((Number(document['plan_amount']) + Number(document['additional_charges']))*document['advance_percent']/100)],
                is_visible: [(document['is_visible']==1)?true:false],
                selected_plan: [(document['selected_plan']==1)?true:false],
              })
            )
          );
    }

    hide() {
        this.dialogRef.close();
    }

    percentageChange(index)
    {

        let totalFee = this.documentsControl.controls[index].get(['total_fee'])?.value;
        let perctage = this.documentsControl.controls[index].get(['advance_percent'])?.value;
        let percent = Math.round((Number(totalFee)*Number(perctage))/100);
        this.documentsControl.controls[index].get('advance_amount')?.setValue(percent);
    }

    additionalcharges(index)
    {

        let additional_charges = this.documentsControl.controls[index].get(['additional_charges'])?.value;
        let plan_amount = this.documentsControl.controls[index].get(['plan_amount'])?.value;
        let perctage = this.documentsControl.controls[index].get(['advance_percent'])?.value;
        let allaount = (Number(plan_amount) + Number(additional_charges));
        let percent = Math.round((Number(allaount)*Number(perctage))/100);
         this.documentsControl.controls[index].get('total_fee')?.setValue(allaount);
         this.documentsControl.controls[index].get('advance_amount')?.setValue(percent);
    }
    

    onSubmit() {
        let apiToCall: any;
         apiToCall = this.recoveryService.updatePrice(this.priceForm.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Saved successfully!', 'Success!');
            },
            error=>{
                this.hide();
            }
        );
    }

    selectdPlanChange(index)
    {
        for(let i= 0; i < (this.dataset.length); i++){
            if(index != i)
                this.documentsControl.controls[i].get('selected_plan')?.setValue(false);
        }
    }
       
}