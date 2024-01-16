import { Component, OnInit,ElementRef,ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BranchService } from "src/app/_services/branch.service";
import { TemplatesService } from "src/app/_services/templates.service"; 
declare var $: any; // Declare jQuery
import { Location } from '@angular/common';

@Component({
    selector: 'app-email-templates-add',
    templateUrl: './email-templates-add.component.html'
})

export class EmailTemplatesAddComponent implements OnInit{
    pageTitle:string = "Add Email Templates";
    templateFrom: FormGroup;
    submitted: boolean;
    serverError:string = '';
    @ViewChild("calRefference") calRefference: ElementRef;
    serverErrorShow:boolean;
    branchList=[];
    isEdit:boolean = false;
    constructor( private formBuilder: FormBuilder, private el: ElementRef,
        private toastrService: ToastrService, private templatesService: TemplatesService, private router:Router, private route: ActivatedRoute, private branchService: BranchService, private _location: Location){
            if(this.router.url.indexOf("/edit/") != -1){
                this.isEdit = true;
                this.pageTitle = "Edit Email Templates";
              }
        }
            
    ngOnInit(): void {
        this.loadForm();
        if(this.isEdit)
        {
          this.templatesService.getTemplateDetail(this.route.snapshot.params['id']).subscribe( data => {
          this.modelToForm(data as any);
        });       
        }
        
        this.branchService.getAllBranch().subscribe(data=>{
            this.branchList = data as any;
        })
    }

    ngAfterViewInit() {
        console.log('After Load');
        $('#summernote').summernote({height: 200,tabsize: 2,});
    }

    loadForm(){
        this.templateFrom = this.formBuilder.group({
            id: [],
            status: ['', [Validators.required]],
            subject: ['', [Validators.required]],
            template: ['', [Validators.required]]
        });
    }

    modelToForm(data)
    { 
        this.templateFrom.setValue({
            id: data.id,
            status:data.status,
            subject:data.subject,
            template:''
        });
        $("#summernote").summernote('code', data.template);
    }

    get etf() { return this.templateFrom.controls; }

    save(){
        this.submitted = true;
        if(this.calRefference != undefined){
            this.etf['template'].setValue(this.calRefference.nativeElement.value);
        }
        if (this.templateFrom.invalid) {
            return false;
        }
        let apiToCall: any;
        apiToCall = this.templatesService.addTemplate(this.templateFrom.value);
        apiToCall.subscribe( data => {
                this.toastrService.success(data.message, 'Success!');
                this.router.navigate(['admin/email-template']);
            },
            error => {
                let serverResponse = error.error;
                console.log(serverResponse);
                for (var key in serverResponse) {
                    console.log(serverResponse[key]);
                    if (serverResponse[key] === "Unauthorized")
                        this.toastrService.error('Bad Credentials!', 'Error!');
                    else
                        this.etf[key].setErrors({ 'required': serverResponse[key] });
                }
            });
    }

    reset(){
        this._location.back();
    }
}