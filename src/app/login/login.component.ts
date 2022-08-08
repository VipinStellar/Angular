import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from './../_services/account.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  token: string;
  constructor(private toastrService: ToastrService, private accountService: AccountService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    if (this.accountService.userValue != null) {
      this.router.navigateByUrl('admin');
    }

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.accountService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastrService.success('User login successfully!', 'Success!');
          this.router.navigateByUrl('admin');
        },
        error => {
          this.loading = false;
          let serverResponse = error.error;
          for (var key in serverResponse) {
            if (serverResponse[key] === "Unauthorized")
              this.toastrService.error('Bad Credentials!', 'Error!');
            else
              this.f[key].setErrors({ 'message': serverResponse[key][0] });
          }
        }
      );
  }
}
