import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommanComponent } from './comman/comman.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageComponent } from './page/page.component';
import { UserComponent } from './user/user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RoleComponent } from './role/role.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RoleAddComponent } from './role/role-add.component';
import { BranchComponent } from './branch/branch.component';
import { BranchAddComponent } from './branch/branch-add.component';
import { UserAddComponent} from './user/user-add.component';
import { BranchviewComponent } from './branch/branch-view.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatSelectFilterModule } from 'mat-select-filter';
import { UseriewComponent } from './user/user-view.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { MediaInComponent } from './media-in/media-in.component';
import { MediaCaseDetail } from './media-in/media-case-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MediaPreComponent } from './media-in/media-pre.component';
import { MatProgressSpinnerModule  } from '@angular/material/progress-spinner';
import { MediaAssignToAdd } from './media-in/media-assign-to-add.component';
import { MediaEdit}  from './media-in/media-edit.component';
import { MediaAssessmentView }  from './media-in/media-assessment-view.component';
import { MediaAssessmentEdit } from './media-in/media-edit-assessment.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MediaTransfer } from './media-in/media-transfer.component';
import {MediaTeam } from './media-in/media-team.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CommanComponent,
    DashboardComponent,
    PageComponent,
    UserComponent,
    RoleComponent,
    RoleAddComponent,
    BranchComponent,
    BranchAddComponent,
    UserAddComponent,
    BranchviewComponent,
    UseriewComponent,
    AccessDeniedComponent,
    MediaInComponent,
    MediaCaseDetail,
    MediaPreComponent,
    MediaAssignToAdd,
    MediaEdit,
    MediaAssessmentView,
    MediaAssessmentEdit,
    MediaTransfer,
    MediaTeam
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    AdminRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSelectFilterModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
})
export class AdminModule { }
