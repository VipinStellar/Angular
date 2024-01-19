import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ReceiptService } from './../../_services/receipt.service';
import { ToastrService } from 'ngx-toastr';
import { Receipt } from 'src/app/_models/receipt';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { formatDate } from "@angular/common";
@Component({
    selector: 'app-receipt-add',
    templateUrl: './receipt-add.component.html',
})
export class ReceiptAddComponenet implements OnInit {
    pageTitle: string;
    submitted: boolean;
    loading: boolean;
    receipt: Receipt[] = [];
    receiptForm: FormGroup;
    type:string;
    constructor(private formBuilder: FormBuilder,
                private receiptService: ReceiptService,
                private router: Router,
                private _location: Location,
                private toastrService: ToastrService, 
                private route: ActivatedRoute,) {

    }
    ngOnInit(): void {
        let id = this.route.snapshot.params['id'];
        if(this.router.url.indexOf("/edit/") != -1){
            this.type = 'receipt';
            this.pageTitle = "Edit Receipt";
        }
        if(this.router.url.indexOf("/add/") != -1){
            this.pageTitle = "Add Receipt";
            this.type = 'invoice';
        }
        this.receiptService.getDetails(this.type,id).subscribe(data => {
            this.receipt = data as any;
            this.modeltoForm(this.receipt);
        });

       
        this.receiptForm = this.formBuilder.group({
            id: [''],
            job_id: [''],
            media_id: [''],
            branch_id: [''],
            invoice_no: [''],
            invoice_date: [''],
            invoice_id:[],
            invoice_total_amount: [''],
            paid_amount: [''],
            received_amount: ['', [Validators.required]],
            tds_amount: ['', [Validators.required]],
            payment_mode: ['', [Validators.required]],
            cheque_dd: [''],
            transaction_id: ['', [Validators.required]],
           // transaction_date: ['', [Validators.required]],
            payment_received_date: ['', [Validators.required]],
           // media_type: ['', [Validators.required]],
        });      

    }

    onSubmit() {
        this.submitted = true;
        if (this.receiptForm.invalid) {
            return false;
        }
       let payAmount =  (Number(this.fr['tds_amount'].value) + Number(this.fr['received_amount'].value));
       let total = Number(this.fr['invoice_total_amount'].value);
        if(total < payAmount)
        {
        this.fr['received_amount'].setErrors({ 'message': 'Current amount is grater than invoice amount!' });
            return false;
         } 
         let apiToCall: any;
         apiToCall = this.receiptService.receiptupdate(this.receiptForm.value);
         apiToCall.subscribe(
             data => {
                 this.hide();
                 this.toastrService.success('Details Saved successfully!', 'Success!');
             },
             error => {
                let serverResponse = error.error;
                for (var key in serverResponse) {
                    if (serverResponse[key] === "Unauthorized")
                        this.toastrService.error('Bad Credentials!', 'Error!');
                    else
                        this.fr[key].setErrors({ 'message': serverResponse[key] });
                }
             }
         );
    }

    modeltoForm(receipt) {
        if(this.type == 'invoice')
        {
            this.fr['job_id'].setValue((receipt['job_id'] =='' || receipt['job_id'] ==null)?receipt['deal_id']:receipt['job_id']);
            this.fr['invoice_no'].setValue(receipt['invoice_no']);
            this.fr['invoice_id'].setValue(receipt['id']);
            this.fr['invoice_date'].setValue(receipt['created_on']);
            this.fr['branch_id'].setValue(receipt['req_branch_id']);
            this.fr['media_id'].setValue(receipt['mediaId']);
            this.fr['invoice_total_amount'].setValue(receipt['final_amount']);
        }
        else if(this.type == 'receipt')
        {
            this.receiptForm.setValue({
                id:receipt['id'],
                job_id:(receipt['job_id'] =='' || receipt['job_id'] ==null)?receipt['deal_id']:receipt['job_id'],
                invoice_no: receipt['invoice_no'],
                invoice_id: receipt['invoice_id'],
                invoice_date: receipt['Invoice']['created_on'],
                branch_id: receipt['branch_id'],
                media_id: receipt['media_id'],
                invoice_total_amount:receipt['Invoice']['final_amount'],
                received_amount:receipt['received_amount'],
                tds_amount:receipt['tds_amount'],
                payment_mode:receipt['payment_mode'],
                cheque_dd:receipt['cheque_dd'],
                transaction_id:receipt['transaction_id'],
                paid_amount:'',
               // transaction_date:this.formatFormDate(new Date(receipt['transaction_date'])),
                payment_received_date:this.formatFormDate(new Date(receipt['payment_received_date'])),
             
            });
            this.receiptTotal();
        }
    }

    hide() {
        this._location.back();
    }

    formatFormDate(date: Date) {
        return formatDate(date, 'yyyy-MM-dd', 'en');
      }

    get fr() { return this.receiptForm.controls; }

    receiptTotal()
    {
        let   tds_amount      = this.fr['tds_amount'].value;
        let   received_amount = this.fr['received_amount'].value;
        let Total = Number(Number(received_amount) + Number(tds_amount));
        this.fr['paid_amount'].setValue(Total);
    }

}