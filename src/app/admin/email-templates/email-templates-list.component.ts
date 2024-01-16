import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Template } from '../../_models/template';
import { ToastrService } from "ngx-toastr";
import Swal from 'sweetalert2';
import { TemplatesService } from 'src/app/_services/templates.service';

@Component({
  selector: 'app-email-templates-list',
  templateUrl: './email-templates-list.component.html'
})
export class EmailTemplatesListComponent implements OnInit {
  ELEMENT_DATA: Template[] = [];
  selected: Template;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  sortOrder = 'desc';
  sortField = 'id';
  pageTitle = "Email Templates";
  displayedColumns: string[] = ['sr_no','subject', 'status','action'];
  templateList: MatTableDataSource<Template> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  subjectData:string='';
  constructor( private templatesService:TemplatesService, private toastrService: ToastrService, private router:Router, public dialog: MatDialog){}
  ngOnInit(): void { 
    this.loadData();
  }
  loadData() {
    var searchParams = {};
    searchParams['page_no'] = this.currentPage + 1;
    searchParams['pageSize'] = this.pageSize;
    searchParams['order'] = this.sortOrder;
    searchParams['orderBy'] = this.sortField;
    searchParams['subjectData'] = this.subjectData;
    this.templatesService.getTemplates(searchParams).subscribe(
      data => {
        let res = data as any;
        this.templateList.data = res.data;
        this.totalRows = res.recordsTotal;
      });
  }
  sortData(sort: Sort) {
    this.sortField = sort.active;
    this.sortOrder = sort.direction == '' ? 'asc' : sort.direction;
    this.loadData();
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }
  _search()
  {
    this.loadData();
  }
  reset()
  {
    this.subjectData = '';
    this.loadData();
  }

  deleteTemplate(template) {
    Swal.fire({
      title: 'Are you sure want to Delete? ' + template.subject,
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        let apiToCall: any  = this.templatesService.deleteTemplate(template.id);
        apiToCall.subscribe( data => {
            console.log(data.message);
            this.toastrService.success(data.message, 'Success!');
            this.loadData();
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }
}
