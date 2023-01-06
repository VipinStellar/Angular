import { Component, OnInit, Inject } from '@angular/core';
import { MediaIn } from 'src/app/_models/mediaIn';
import { MediaInService } from './../../_services/mediaIn.service';
import { AppUtil } from 'src/app/_helpers/app.util';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
@Component({
    selector: 'app-observation-edit',
    templateUrl: './observation-edit.component.html',
})
export class ObservationEdit implements OnInit {
    pageTitle: string = "Initial Physical Observation";
    assignedRole: [];
    currentUrl: string;
    isAsscessDenied: boolean;
    isLoading: boolean = true;
    mediaDetails: MediaIn[] = [];
    mediaEdit: FormGroup;
    submitted: boolean;
    loading: boolean;
    mediaObj: any = [];
    constructor(private mediaInService: MediaInService,private router: Router, private route: ActivatedRoute,
              private toastrService: ToastrService ,private _location: Location, private formBuilder: FormBuilder,private accountService: AccountService) {}    
    ngOnInit(): void {
        this.assignedRole = this.route.snapshot.data['profileResolver'];
        this.currentUrl = this.router.url.split('/')[2];
        this.isAsscessDenied = AppUtil._getPageAccess(this.assignedRole, 'modify', this.currentUrl);
        this.mediaObj = AppUtil.getMediaDeatils() as any;
        if (!this.isAsscessDenied)
        this.router.navigate(['admin/access-denied']);
        this.loadForm();  
        this.mediaInService.getObservation(this.route.snapshot.params['id']).subscribe(data => {
            this.mediaDetails = data as any;    
            this.modeltoForm(this.mediaDetails);        
            this.loading = false;
        });
    }

    appendOption(val, key) {
        let list = this.mediaObj[key].find(x => x == val);
        if (list == undefined) {
            if (val != null && val != '')
                this.mediaObj[key].push(val);
        }
    }

    modeltoForm(media)
    {
        this.appendOption(media.total_numbers_of_heads, 'plattersCount');
        this.appendOption(media.total_number_of_platters, 'plattersCount');
        this.appendOption(media.number_of_working_heads, 'plattersCount');
        this.appendOption(media.number_of_non_working_heads, 'plattersCount');
        this.mediaEdit.setValue({
            id:media.id,
            media_id:media.mediaId,
            media_seal_condition:media.media_seal_condition,
            p_c_b_found_faulty:media.p_c_b_found_faulty,
            unique_rom_chip:media.unique_rom_chip,
            p_c_b_original:media.p_c_b_original,
            motor_found_faulty:media.motor_found_faulty,
            p_c_b_found_tempered:media.p_c_b_found_tempered,
            head_stack_assembly:media.head_stack_assembly,
            found_foreign_particles_on_platters:media.found_foreign_particles_on_platters,
            total_numbers_of_heads:media.total_numbers_of_heads,
            total_number_of_platters:media.total_number_of_platters,
            number_of_working_heads:media.number_of_working_heads,
            number_of_non_working_heads:media.number_of_non_working_heads,
            condition_of_platter_surface:media.condition_of_platter_surface,
            condition_of_multiple_platter_surface:media.condition_of_multiple_platter_surface,
            platter_cleaning_required_at_initial_stage:media.platter_cleaning_required_at_initial_stage,
            p_c_b_rom_is_corrupted:media.p_c_b_rom_is_corrupted,
            service_area_are_corrupted:media.service_area_are_corrupted,
            imaging_process_at_initial_stage:media.imaging_process_at_initial_stage,
            spare_required:media.spare_required,
            total_numbers_of_heads_other : '',
            total_number_of_platters_other : '',
            number_of_working_heads_other : '',
            number_of_non_working_heads_other : '',   
            recovery_possibility:media.recovery_possibility,
            no_recovery_reason:JSON.parse(media.no_recovery_reason),
            no_recovery_reason_other:media.no_recovery_reason_other,
        });
    }

    get f() { return this.mediaEdit.controls; }

    loadForm()
    {
        this.mediaEdit = this.formBuilder.group({
            id : [''],
            media_id : [''],
            media_seal_condition : [''],
            p_c_b_found_faulty : [''],
            unique_rom_chip : [''],
            p_c_b_original : [''],
            motor_found_faulty : [''],
            p_c_b_found_tempered : [''],
            head_stack_assembly : [''],
            found_foreign_particles_on_platters : [''],
            total_numbers_of_heads : [''],
            total_number_of_platters : [''],
            number_of_working_heads : [''],
            number_of_non_working_heads : [''],
            condition_of_platter_surface : [''],
            condition_of_multiple_platter_surface : [''],
            platter_cleaning_required_at_initial_stage : [''],
            p_c_b_rom_is_corrupted : [''],
            service_area_are_corrupted : [''],
            imaging_process_at_initial_stage : [''],
            spare_required : [''],
            total_numbers_of_heads_other : [''],
            total_number_of_platters_other : [''],
            number_of_working_heads_other : [''],
            number_of_non_working_heads_other : [''], 
            recovery_possibility:[],
            no_recovery_reason:[],
            no_recovery_reason_other:[]       
        });
    }

    hide() {
        this._location.back();
    }

    onSubmit() {
        this.submitted = true;
        if (this.mediaEdit.invalid) {
            return false;
        }
        this.loading= true;
        let apiToCall: any;
        if (this.f['total_numbers_of_heads'].value == 'Other') {
            this.f['total_numbers_of_heads'].setValue(this.f['total_numbers_of_heads_other'].value)
        }
        if (this.f['total_number_of_platters'].value == 'Other') {
            this.f['total_number_of_platters'].setValue(this.f['total_number_of_platters_other'].value)
        }
        if (this.f['number_of_working_heads'].value == 'Other') {
            this.f['number_of_working_heads'].setValue(this.f['number_of_working_heads_other'].value)
        }
        if (this.f['number_of_non_working_heads'].value == 'Other') {
            this.f['number_of_non_working_heads'].setValue(this.f['number_of_non_working_heads_other'].value)
        }
        apiToCall = this.mediaInService.updateObservation(this.mediaEdit.value);
        apiToCall.subscribe(
            data => {
                this.hide();
                this.toastrService.success('Details Saved successfully!', 'Success!');
                this.router.navigate(['admin/observation/' + this.mediaDetails['mediaId']]);
            },
            error => {
                this.loading= false;
                console.log(error)
            }
        );
    }
}