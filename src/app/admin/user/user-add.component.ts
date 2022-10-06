import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from './../../_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-add',
    templateUrl: './user-add.component.html',
})
export class UserAddComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    loading:boolean;
    public userForm: FormGroup;
    roleList:[];
    barnchList:[];
    supervisorList :[];
    teamList: [];
    isEdit:boolean;
    constructor(private formBuilder: FormBuilder,
                private userService:UserService,
        private toastrService: ToastrService,
        private dialogRef: MatDialogRef<UserAddComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = "Add New User";  
    }

    ngOnInit() {
        this.roleList = this.data.roleList;
        this.barnchList = this.data.branchList;
        this.teamList = this.data.teamList;
        if(this.data['data'].id != undefined)
        this.diaTitle = "Edit User";
        this.userForm = this.formBuilder.group({
            id: [this.data['data'].id],
            name: [this.data['data'].name, [Validators.required]],
            emp_code : [this.data['data'].emp_code, [Validators.required]],
            role_id: [this.data['data'].role_id, [Validators.required]],
            team_id:[this.data['data'].team_id],
            branch_id: [this.data['data'].branch_id, [Validators.required]],
            supervisor_id: [this.data['data'].supervisor_id, [Validators.required]],
            email : [this.data['data'].email, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
        });
        if(this.data['data'].id != undefined)
        this.OnChangeDropdown();
        if(this.data['data'].id != undefined && this.data['data'].supervisor_id == 0)
        {
            this.f['supervisor_id'].setValue('0');
        }

    }

    get f() { return this.userForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.userForm.invalid) {
            return false;
        }
        this.loading = true;
        let apiToCall: any;
        if (this.f['id'].value == null || this.f['id'].value == '')
            apiToCall = this.userService.addUser(this.userForm.value);
        else
            apiToCall = this.userService.addUser(this.userForm.value);
        apiToCall.subscribe(
            data => {
                this.loading = false;
                this.toastrService.success('User Saved successfully!', 'Success!');
                this.hide();
            },
            error => {
                this.loading = false;
                let serverResponse = error.error;
                for (var key in serverResponse) {
                    if (serverResponse[key] === "Unauthorized")
                        this.toastrService.error('Bad Credentials!', 'Error!');
                    else
                        this.f[key].setErrors({ 'message': serverResponse[key] });
                }
            }
        );
  
    }

    hide() {
        this.dialogRef.close();
    }

    OnChangeDropdown()
    {
        let ss = {id: 58, name: "Admin"};
        let branchID = this.f['branch_id'].value;
        if(branchID != null && branchID.length == 0)
         branchID = null
        this.userService.getSupervisor(this.f['role_id'].value,branchID).subscribe( data => {
            this.supervisorList = data as any;
           });
    }
}