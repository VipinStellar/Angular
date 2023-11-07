import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {CompanyService} from './../../_services/company.service';
import { GstValidator } from './../../_helpers/gst-validator';
@Component({
    selector: 'app-company-edit',
    templateUrl: './company-edit.component.html',
})
export class CompanyEditComponent implements OnInit {
    diaTitle: string;
    companyFrom: FormGroup;
    submitted: boolean;
    stateData:[];
    constructor( private dialogRef: MatDialogRef<CompanyEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,
        private toastrService: ToastrService,private companyService:CompanyService) {
        this.diaTitle = "Edit Company";
       
    }
    ngOnInit(): void {
        this.stateData = this.data[1];
        this.companyFrom = this.formBuilder.group({ 
            id:[this.data[0]['id']],            
            company_name: [this.data[0]['company_name'],[Validators.required]],
            gst_number: [this.data[0]['gst_number'],[Validators.required,GstValidator.validate()]],
            billing_street:[this.data[0]['billing_street'], [Validators.required]],
            shipping_street:[this.data[0]['shipping_street']],
            billing_landmark:[this.data[0]['billing_landmark']],
            shipping_landmark:[this.data[0]['shipping_landmark']],
            billing_city:[this.data[0]['billing_city'],[Validators.required]],
            shipping_city:[this.data[0]['shipping_city']],
            billing_state_ut:[this.data[0]['billing_state_ut'], [Validators.required]],
            shipping_state_ut:[this.data[0]['shipping_state_ut']],
            billing_state_code:[this.data[0]['billing_state_code'], [Validators.required]],
            shipping_state_code:[this.data[0]['shipping_state_code']],
            billing_code:[this.data[0]['billing_code'], [Validators.required]],
            shipping_code:[this.data[0]['shipping_code']],
            billing_country:[this.data[0]['billing_country']],
            shipping_country:[this.data[0]['shipping_country']],
          });
    }

    onSubmit() {
        this.submitted = true;
        if (this.companyFrom.invalid) {
            return false;
        }
       let gstpos =  this.tc['gst_number'].value.slice(0, 2);
       let statecode =  this.tc['billing_state_code'].value;
       if(gstpos != statecode)
       {
        this.tc['gst_number'].setErrors({ 'gstInvalid':  "Invalid GST number"});
        return false;
       }
         let apiToCall: any;
         apiToCall = this.companyService.updateCompany(this.companyFrom.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Saved successfully!', 'Success!');
            },
            error=>{
                this.tc['gst_number'].setErrors({ 'gstInvalid':  error.error});              
            }
        );
    }

    get tc() { return this.companyFrom.controls; }
    
    hide() {
        this.dialogRef.close();
    }

    stateChange(val,type)
    {
        this.tc['gst_number'].setValue(this.tc['gst_number'].value);
        let index = this.stateData.findIndex(obj => obj['state_name'] === val);
        let stateCode  = this.stateData[index]['state_code'];
        if(type == 1)
            this.tc['billing_state_code'].setValue(stateCode);
        else if(type == 2)
        this.tc['shipping_state_code'].setValue(stateCode);
    }
}