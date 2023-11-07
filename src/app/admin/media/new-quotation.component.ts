import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RecoveryService } from './../../_services/recovery.service';
@Component({
    selector: 'app-new-quotation',
    templateUrl: './new-quotation.component.html',
})
export class NewQuotationComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    Quotation: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private recoveryService:RecoveryService,
        private dialogRef: MatDialogRef<NewQuotationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.diaTitle= 'New Quotation';
        }
       ngOnInit(): void {
        this.Quotation = this.formBuilder.group({ 
            media_id:[this.data['id']],            
            plan_id: [this.data['FinalPrice']['plan_id']],
            plan_type: [this.data['FinalPrice']['plan_type']],
            total_amount: [this.data['FinalPrice']['total_amount']],
            base_amount: [this.data['FinalPrice']['base_amount']],
            new_total_price: ['',[Validators.required]],
            discount_type: ['Percentage',[Validators.required]],
            tax_amount: [''],
            discount_amount: [''],
            discount:['', [Validators.required,Validators.maxLength(2)]],
            description:[''],
            new_basePrice:[''],
            new_percentage:[''],
          });
    }

    get tm() { return this.Quotation.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.Quotation.invalid) {
            return false;
        }
         let apiToCall: any;
         apiToCall = this.recoveryService.addQuotation(this.Quotation.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Saved successfully!', 'Success!');
            },
            error=>{
                console.log(error)
            }
        );
    }

    hide() {
        this.dialogRef.close();
    }

    discountTypeChange()
    {
        this.tm['discount'].setValue(null);
        this.discountChange();
    }

    discountChange()
    {
        let   discount = this.tm['discount'].value;
        let percen = Number(discount).toFixed(0)
        let   baseAmount = this.tm['base_amount'].value;
        let   taxAmount = 0;
        let   tax = 0;
        let   discountType = this.tm['discount_type'].value;
        if(discountType == 'Fixed Amount' && baseAmount  < discount)
        {
            this.tm['discount'].setErrors({'message':"Discount amount should be less than service fee"});
            return
        }
        else if((discountType == 'Percentage') && Number(99) < Number(percen))
        {
            this.tm['discount'].setErrors({'message':"Discount amount should be less than service fee"});
            return
        }
           if(this.data['tax_applicable'] == '1')
            tax = 18;
            if(discountType == 'Fixed Amount' && discount !=0)
            {
                discount = parseFloat((Number(discount)/Number(baseAmount)*100).toFixed(3));              
            }
        let discountAmount = Math.round((Number(baseAmount)*Number(discount))/100);
         baseAmount = Math.round(baseAmount - discountAmount); 
         taxAmount = Math.round((Number(baseAmount)*Number(tax))/100);
         let new_total_price = Math.round(baseAmount + taxAmount);
         if(discount == null)
         {
            this.tm['new_total_price'].setValue(0);
            this.tm['discount_amount'].setValue(0);
            this.tm['tax_amount'].setValue(0);
            this.tm['new_basePrice'].setValue(baseAmount);
         }else
         {
         this.tm['new_total_price'].setValue(new_total_price);
         this.tm['discount_amount'].setValue(discountAmount);
         this.tm['tax_amount'].setValue(taxAmount);
         this.tm['new_basePrice'].setValue(baseAmount);
         }
         this.tm['new_percentage'].setValue(discount);
    }
}