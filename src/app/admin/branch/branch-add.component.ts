import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BranchService } from './../../_services/branch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-branch-add',
    templateUrl: './branch-add.component.html',
})
export class BranchAddComponent implements OnInit {
    diaTitle: string;
    submitted: boolean;
    loading:boolean;
    public branchForm: FormGroup;
    countryList:[];
    stateList:[];
    countryFilter;
    StateFilter;
    constructor(private formBuilder: FormBuilder,
        private branchService: BranchService,
        private toastrService: ToastrService,
        private dialogRef: MatDialogRef<BranchAddComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.diaTitle = "Add New Branch";
       this.countryList = this.data['countryList'][0];
       this.stateList = this.data['stateList'][0];
       
    }
   
    ngOnInit() {
        this.countryFilter  = this.countryList.slice();
        this.StateFilter  = this.stateList.slice();
        if(this.data['data'].id != undefined)
        this.diaTitle = "Edit Branch";
        this.branchForm = this.formBuilder.group({
            id: [this.data['data'].id],
            branch_name: [this.data['data'].branch_name, [Validators.required]],
            country_id: [this.data['data'].country_id, [Validators.required]],
            state_name: [this.data['data'].state_name, [Validators.required]],
            address: [this.data['data'].address, [Validators.required]],
            branch_type: [this.data['data'].branch_type, [Validators.required]]
        });
    }

    get f() { return this.branchForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.branchForm.invalid) {
            return false;
        }
        this.loading = true;
        let apiToCall: any;
        if (this.f['id'].value == null || this.f['id'].value == '')
            apiToCall = this.branchService.addBranch(this.branchForm.value);
        else
            apiToCall = this.branchService.updateBranch(this.branchForm.value);
        apiToCall.subscribe(
            data => {
                this.loading = false;
                this.toastrService.success('Branch Saved successfully!', 'Success!');
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
}