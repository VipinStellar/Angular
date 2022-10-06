import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RoleService } from './../../_services/role.service';
import { ToastrService } from 'ngx-toastr';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
    selector: 'app-role-add',
    templateUrl: './role-add.component.html',
})
export class RoleAddComponent implements OnInit {
    currentUrl: string;
    assignedRole: [];
    isAsscessDenied: boolean;
    pageTitle: string;
    submitted: boolean;
    loading: boolean;
    roleForm: FormGroup;
    moduleList: [];
    roleList: [];
    isEdit: boolean = false;
    constructor(private formBuilder: FormBuilder,
        private roleService: RoleService,
        private toastrService: ToastrService, private router: Router, private route: ActivatedRoute, private _location: Location) {
        this.pageTitle = "Add Role";
        if(this.router.url.indexOf("/edit/") != -1){
            this.isEdit = true;
            this.pageTitle = "Edit Role";
          }

    }

    ngOnInit() {
        this.moduleList = this.route.snapshot.data['moduleList'];
        this.roleList = this.route.snapshot.data['roleList'];
        this.currentUrl = this.router.url.split('/')[2];
        this.assignedRole = this.route.snapshot.data['profileResolver'];
        this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'modify', this.currentUrl);
        if (!this.isAsscessDenied)
            this.router.navigate(['admin/access-denied']);
        this.loadForm();

        if(this.isEdit)
        {
        this.roleService.getRole(this.route.snapshot.params['id']).subscribe( data => {
          this.modelToForm(data as any);
        });       
        }
    }

    loadForm() {
        this.roleForm = this.formBuilder.group({
            id: [],
            access: ['', Validators.required],
            modify: [],
            delete: [],
            role_name: ['', Validators.required],
            parent_id: ['', Validators.required],
        });
    }

    modelToForm(data)
    {
        let assign = JSON.parse(data['assign']);
        this.roleForm.setValue({
            id: data.id,
            role_name:data.role_name,
            parent_id:data.parent_id,
            access:assign.access,
            modify:assign.modify,
            delete:assign.delete,
        });
    }

    get f() { return this.roleForm.controls; }

    onSubmit() {
        let assign = { 'access': null, 'modify': null, 'delete': null };
        assign['access'] = this.f['access'].value;
        assign['modify'] = this.f['modify'].value;
        assign['delete'] = this.f['delete'].value;
        this.submitted = true;
        if (this.roleForm.invalid) {
            return false;
        }
        let { id, role_name,parent_id } = this.roleForm.value;
        let dataToPost: any = { id, role_name,parent_id };
        dataToPost['assign'] = JSON.stringify(assign);
        this.loading = true;
        let apiToCall: any;
        apiToCall = this.roleService.addRole(dataToPost);
        apiToCall.subscribe(
            data => {
                this.loading = false;
                this.toastrService.success('Role Saved successfully!', 'Success!');
                this.router.navigate(['/admin/role']);
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

    cancel() {
        this._location.back();
    }
}