import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { UserService } from './../../_services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-user-change',
    templateUrl: './user-change-password.component.html',
  })

  export class UserChangePassword implements OnInit{
    ChangePassword: FormGroup;
    pageTitle: string;
    submitted:boolean;
    loading: boolean;
    constructor(private toastrService: ToastrService,private formBuilder: FormBuilder,private _location: Location,private userService: UserService) {

    }
    ngOnInit(): void {
        this.pageTitle = "Change Password"
        this.ChangePassword = this.formBuilder.group(
            {
              old_password: ["",Validators.required],
              new_password: ["",Validators.required],
              new_password_confirmation: ["",Validators.required]
            },
            {
              validator: ConfirmPasswordValidator("new_password", "new_password_confirmation")
            }
          );
    }

    get f() { return this.ChangePassword.controls; }

    cancel()
    {
        this._location.back();
    }
    onSubmit()
    {
        this.submitted = true;
        if (this.ChangePassword.invalid) {
            return false;
        }
        this.loading = true;
        let apiToCall: any;
        apiToCall = this.userService.changePassword(this.ChangePassword.value);
        apiToCall.subscribe(
            data => {
                this.toastrService.success('User Password Has been Changed!', 'Success!',{ timeOut: 3000 });
                this.loading = false;
                this._location.back();
           },
            error => {
                this.loading = false;
                let serverResponse = error.error;
               this.f['old_password'].setErrors({ 'message': error.error.password});
            }
        );
    }
  }