import { Component, OnInit } from '@angular/core';
import { MediaService } from './../../_services/media.service';
import { PaymentService } from 'src/app/_services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './../../_services/account.service';
import { AuthUser } from 'src/app/_models/authuser';
import { MatDialog } from '@angular/material/dialog';
import { Media } from './../../_models/media';
import { PriceEditComponent } from './price-edit.component';
import { NewQuotationComponent } from './new-quotation.component';
import { RecoveryService } from './../../_services/recovery.service';
import { environment } from 'src/environments/environment';
import { PaymentEditComponent } from '../payment/payment-edit.component';
import { PoEditComponent } from '../payment/po-edit.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery-charges',
  templateUrl: './recovery-charges.component.html',
})
export class RecoveryChargesComponent implements OnInit {
  mediaDetails: Media[] = [];
  user: AuthUser;
  QuotationShow: boolean = true;
  paymentAddShow: boolean = true;
  backEndUrl = environment.apiUrl.replace("/api", "") + "payment/";
  PDFurl = environment.apiUrl.replace("/api", "");
  constructor(private mediaService: MediaService, private paymentService: PaymentService, private route: ActivatedRoute,
    private accountService: AccountService, public dialog: MatDialog, private recoveryService: RecoveryService, private toastrService:ToastrService ) { }

  ngOnInit(): void {
    this.user = this.accountService.userValue;
    this.loadMediaDetails();
  }

  loadMediaDetails() {
    this.mediaService.getRecoveryCharges(this.route.snapshot.params['id']).subscribe(data => {
      this.mediaDetails = data as any;
      this.mediaDetails['Quotation'].forEach(obj => {
        if (obj['status'] == "Pending" || obj['status'] == "Confirmed") {
          this.QuotationShow = false;
        }
      });
      this.mediaDetails['AllPayment'].forEach(obj => {
        if (obj['invoice_no'] == null && this.paymentAddShow) {
          this.paymentAddShow = false;
        }
        else if(obj['invoice_no'] != null && !this.paymentAddShow)
        {
          this.paymentAddShow = true;
        }
      });
    });
  }

  generateInvoice(item) {
    Swal.fire({
      title: 'Are you sure want to generate invoice ',
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.paymentService.generateInvoice(item['reqId']).subscribe(data => {
          this.toastrService.success('Invoice Generated', 'Success!');
          this.loadMediaDetails();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }

  // generateInvoice(item) {
  //   this.paymentService.generateInvoice(item['reqId']).subscribe(data => {
  //     this.toastrService.success('Invoice Generated', 'Success!');
  //     this.loadMediaDetails();
  //   });
  // }

  generateIrn(item){
    this.paymentService.generateIrn(item['invoice_id']).subscribe(data => {
      let result = data as any; 
      if(result['irn_status']==1)
        this.toastrService.success(result['irn_msg'], 'Success!');
      else
        this.toastrService.error(result['irn_msg'], 'Error!');

        this.loadMediaDetails();
    });
  }

  editPrice() {
    const dialogRef = this.dialog.open(PriceEditComponent, {
      data: this.mediaDetails,
      disableClose: true,
      autoFocus: true,
      width: "65%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadMediaDetails();
    });
  }

  _percentage(a, c) {
    let final = (Number(a) * c) / 100;
    return final;
  }

  newQuotation() {
    const dialogRef = this.dialog.open(NewQuotationComponent, {
      data: this.mediaDetails,
      disableClose: true,
      autoFocus: true,
      width: "70%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadMediaDetails();
    });
  }

  addPayment(obj) {
    const dialogRef = this.dialog.open(PaymentEditComponent, {
      data: [this.mediaDetails, obj],
      disableClose: true,
      autoFocus: true,
      width: "50%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadMediaDetails();
    });
  }

  editPO()
  {
    const dialogRef = this.dialog.open(PoEditComponent, {
      data: this.mediaDetails,
      disableClose: true,
      autoFocus: true,
      width: "50%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadMediaDetails();
    });
  }

  advenceamountcal(to,per)
  {
    let percent = Math.round((Number(to)*Number(per))/100);
    return percent;
  }
}
