import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {ContactService} from './../../_services/contact.service';
import { StateService } from './../../_services/state.service';
import { GstValidator } from './../../_helpers/gst-validator';
@Component({
    selector: 'app-contact-edit',
    templateUrl: './contact-edit.component.html',
})
export class ContactEditComponent implements OnInit {
    diaTitle: string;
    contactFrom: FormGroup;
    submitted: boolean;
    stateList;
    serverError:boolean;
    constructor( private dialogRef: MatDialogRef<ContactEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,
        private toastrService: ToastrService,private contactService:ContactService,private stateService:StateService) {
        this.diaTitle = "Verify Contact Details";
       
    }
    ngOnInit(): void {
        this.getAllState();
          this.contactFrom = this.formBuilder.group({ 
            id:[this.data['id']],            
            first_name: [this.data['first_name'],[Validators.required]],
            last_name: [this.data['last_name'],[Validators.required]],
            email:[this.data['email'], [Validators.required]],
            mobile:[this.data['mobile'], [Validators.required]],
            mailing_street:[this.data['mailing_street']],
            mailing_region:[this.data['mailing_region']],
            mailing_city:[this.data['mailing_city']],
            mailing_state_code:[this.data['mailing_state_code']],
            mailing_country:[(this.data['mailing_country'] !=null && this.data['mailing_country'] !='')?this.data['mailing_country']:'India'],
            mailing_state_ut:[this.data['mailing_state_ut']],
            mailing_zip:[this.data['mailing_zip']],
            use_billing_address:[this.data['use_billing_address'], [Validators.required]],
            billing_name:[this.data['billing_name']],
            billing_email:[this.data['billing_email']],
            billing_phone:[this.data['billing_phone']],
            billing_street:[this.data['billing_street']],
            billing_city:[this.data['billing_city']],
            billing_state:[this.data['billing_state']],
            billing_state_code:[this.data['billing_state_code']],
            billing_zip:[this.data['billing_zip']],
            billing_landmark:[this.data['billing_landmark']],
            billing_country:[(this.data['billing_country'] !=null && this.data['billing_country'] !='')?this.data['billing_country']:'India'],
            gst_number:[this.data['gst_number']],
            com_id:[this.data['com_id']],
            com_billing_street:[this.data['com_billing_street']],
            com_billing_city:[this.data['com_billing_city']],
            com_billing_landmark:[this.data['com_billing_landmark']],
            billing_state_ut:[this.data['billing_state_ut']],
            com_billing_state_ut:[this.data['com_billing_state_ut']],
            com_billing_state_code:[this.data['com_billing_state_code']],
            com_billing_code:[this.data['com_billing_code']],
            com_billing_country:[(this.data['com_billing_country'] !=null && this.data['com_billing_country'] !='')?this.data['com_billing_country']:'India'],
            com_gst_number:[this.data['com_gst_number']],
          });
          this.contactAddressChange();
    }

    getAllState()
    {
        this.stateService.getAllState().subscribe(data => {this.stateList = data as any;
            this.stateList = this.stateList[0];});
    }

    onSubmit() {
         this.submitted = true;
        if (this.contactFrom.invalid) {
            return false;
        }
        this.serverError = false;
        let address =  this.tc['use_billing_address'].value;
        if(address == 'Same as Contact Mailing Address')
        {
            let gst = null;
            let Statecode =  this.tc['mailing_state_code'].value;
            if(this.tc['gst_number'].value !=null && this.tc['gst_number'].value !='')
              gst =  this.tc['gst_number'].value.slice(0, 2);
            if(gst !=null && gst !='' && Statecode !=gst)
            {
                this.tc["gst_number"].setErrors({ 'message': "Invalid GST number" });
                return false;
            }
        }else if(address == 'Same as Account Billing Address')
        {
            let Statecode =  this.tc['com_billing_state_code'].value;
            let gsts = null;
            if(this.tc['com_gst_number'].value !=null && this.tc['com_gst_number'].value !='')
             gsts =  this.tc['com_gst_number'].value.slice(0, 2);
            if(Statecode !=gsts)
            {
                this.tc["com_gst_number"].setErrors({ 'message': "Invalid GST number" });
                return false;
            }
        }
         let apiToCall: any;
         apiToCall = this.contactService.updateContact(this.contactFrom.value);
        apiToCall.subscribe(
            data => {
                this.dialogRef.close('Save');
                this.toastrService.success('Details Saved successfully!', 'Success!');
            },
            error=>{
                this.serverError = true;
                let serverResponse = error.error;
                for (var key in serverResponse) {
                    if (serverResponse[key] === "Unauthorized")
                        this.toastrService.error('Bad Credentials!', 'Error!');
                    else
                        this.tc[key].setErrors({ 'message': serverResponse[key] });
                }
            }
        );
    }

    get tc() { return this.contactFrom.controls; }
    
    hide() {
        this.dialogRef.close('Cancel');
    }

    stateChange(val,type)
    {
        this.tc['billing_zip'].setValue(this.tc['billing_zip'].value);
        this.tc['com_billing_code'].setValue(this.tc['com_billing_code'].value);
        this.tc['mailing_zip'].setValue(this.tc['mailing_zip'].value);
        this.tc['gst_number'].setValue(this.tc['gst_number'].value);
        this.tc['com_gst_number'].setValue(this.tc['com_gst_number'].value);
        let index = this.stateList.findIndex(obj => obj['state_name'] === val);
        let stateCode  = this.stateList[index]['state_code'];
        if(type == 1)
            this.tc['mailing_state_code'].setValue(stateCode);
        else if(type == 2)
        this.tc['billing_state_code'].setValue(stateCode);
        else if(type == 3)
        this.tc['com_billing_state_code'].setValue(stateCode);
    }

     addRequiredValidator(name) {
        //GstValidator.validate()
        if(name == 'com_gst_number')
        this.contactFrom.get(name)?.setValidators([Validators.required]);
        else
        this.contactFrom.get(name)?.setValidators([Validators.required]);
        this.contactFrom.get(name)?.updateValueAndValidity();
      }
       removeRequiredValidator(name) {
            this.contactFrom.get(name)?.clearValidators();
            this.contactFrom.get(name)?.updateValueAndValidity();
      }

      contactAddressChange()
      {
        let fieldNameArray: string[] = ['mailing_street','mailing_region','mailing_city','mailing_state_code','mailing_country','mailing_state_ut',
                                        'mailing_zip','billing_name','billing_email','billing_phone','billing_street','billing_city','billing_state',
                                        'billing_state_code','billing_zip','billing_landmark','billing_country','gst_number','com_billing_street',
                                        'com_billing_city','com_billing_landmark','billing_state_ut','com_billing_state_ut','com_billing_state_code','com_billing_code','com_billing_country','com_gst_number'];
        fieldNameArray.forEach((name) => {this.removeRequiredValidator(name)});
        let accountNameArray: string[] = ['com_gst_number','com_billing_street','com_billing_landmark','com_billing_city','com_billing_state_ut','com_billing_state_code','com_billing_code','com_billing_country'];
       let ContactMailAdd :string[] = ['mailing_street','mailing_region','mailing_city','mailing_state_ut','mailing_state_code','mailing_country','mailing_zip'];
       let otherAdd :string[] = ['billing_name','billing_email','billing_phone','billing_street','billing_city','billing_state','billing_state_code','billing_zip','billing_country','billing_landmark'];
       let Add = this.tc['use_billing_address'].value;
        if(Add == 'Same as Account Billing Address')
        accountNameArray.forEach((name) => {this.addRequiredValidator(name)});
        else if(Add == 'Same as Contact Mailing Address')
        ContactMailAdd.forEach((name) => {this.addRequiredValidator(name)});
        else if(Add == 'Custom Billing Address')
        otherAdd.forEach((name) => {this.addRequiredValidator(name)});
                            
      }
}