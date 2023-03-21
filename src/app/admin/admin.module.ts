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
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
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
import { MediaListComponent } from './media/media-list.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatProgressSpinnerModule  } from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { UserChangePassword } from './user/user-change-password.component';
import { GatePassComponent } from './media/gate-pass.component';
import { InventoryListComponent } from './inventory/inventory-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InventoryAddComponent } from './inventory/inventory-add-component';
import { mediaTable  } from './../_helpers/commanHtmlMedia';
import { MediaViewComponent } from './media/media-view.component';
import { MediaAllotComponent } from './media/media-allot.component';
import { MediaJobProcessComponent } from './media/media-process.component';
import { AllotChangeComponent } from './media/allot-change.component';
import { PreInspectionComponenet } from './media/pre-inspection.component';
import { InspectionComponent } from './media/inspection.component';
import { ObservationEditComponent  } from './media/observation-edit.component';
import { RecoveryComponent } from './media/recovery.component';
import { CloneTransferComponenet } from './media/clone-transfer.component';
import { DailyStatusComponent  } from './media/daily-status.component';
import { TransferListComponent } from './transfer-media/transfer-list.component';
import { TransferEditComponent } from './transfer-media/transfer-edit.component';
import { ExtensionComponent } from './media/extension.component';
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
    MediaListComponent,
    MediaViewComponent,
    MediaAllotComponent,
    MediaJobProcessComponent,
    AllotChangeComponent,
    PreInspectionComponenet,
    InspectionComponent,
    ObservationEditComponent,
    RecoveryComponent,
    CloneTransferComponenet,
    DailyStatusComponent,
    TransferListComponent,
    TransferEditComponent,
    UserChangePassword,
    GatePassComponent,
    InventoryListComponent,
    InventoryAddComponent,
    mediaTable,
    ExtensionComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatTooltipModule,
    AdminRoutingModule,
    MatMenuModule,
    MatCheckboxModule,
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
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  exports: [ MatInputModule ]
})
export class AdminModule { }
