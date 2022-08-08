import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from './../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router,private accountService:AccountService,private toastrService: ToastrService) {  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    let apiToCall: any;
    apiToCall = this.accountService.forgotPassword(this.form.value);
    apiToCall.subscribe(
      data => {
        this.loading = false;
        this.toastrService.success('Password has been sent on your email id!', 'Success!');
        this.router.navigateByUrl('admin');
      },
      error => {
        this.loading = false;
        let serverResponse = error.error;
        for (var key in serverResponse) {
          this.f[key].setErrors({ 'message': serverResponse[key][0] });
        }
      }
    );
  }
}