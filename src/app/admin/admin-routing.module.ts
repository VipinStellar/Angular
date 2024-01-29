import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { CommanComponent } from './comman/comman.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { BranchComponent } from './branch/branch.component';
import { BranchResolver } from './branch/branch.resolver';
import { RoleResolver } from './role/role.resolver';
import { CountryResolver } from './branch/country.resolver';
import { StateResolver} from './branch/state.resolver';
import { ModuleResolver } from './role/module.resolver';
import { TeamResolver } from './user/teamresolver';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { RoleAddComponent } from './role/role-add.component';
import { UserChangePassword } from './user/user-change-password.component';
import { GatePassComponent } from './media/gate-pass.component';
import { InventoryListComponent } from './inventory/inventory-list.component';
import { InventoryAddComponent } from './inventory/inventory-add-component';
import { MediaListComponent } from './media/media-list.component';
import { MediaViewComponent } from './media/media-view.component';
import { MediaAllotComponent } from './media/media-allot.component';
import { MediaJobProcessComponent } from './media/media-process.component';
import { PreInspectionComponenet } from './media/pre-inspection.component';
import { InspectionComponent } from './media/inspection.component';
import { ObservationEditComponent } from './media/observation-edit.component';
import { DailyStatusComponent } from './media/daily-status.component';
import { TransferListComponent } from './transfer-media/transfer-list.component';
import { TransferEditComponent } from './transfer-media/transfer-edit.component';
import { MediaOutComponent } from './media-out/media-out.component';
import { WipingList } from './media-wiping/wiping-list.component';
import { WipingDueList } from './media-wiping/wiping-due-list.component';
import { CompanyComponent } from './company/company.component';
import { ContactComponent } from './contact/contact.component';
import { RecoveryChargesComponent } from './media/recovery-charges.component';
import { PaymentListComponent } from './payment/payment-list.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptAddComponenet } from './receipt/receipt-add.component';
import { EmailTemplatesListComponent } from './email-templates/email-templates-list.component';
import { EmailTemplatesAddComponent } from './email-templates/email-templates-add.component';
import { CreditAddComponenet } from './credit-note/credit-add.component';
const routes: Routes = [
  {
    path: '',
    component: CommanComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'user', component: UserComponent, 
           resolve:{
            branchList:BranchResolver,
            roleList:RoleResolver,
            teamList:TeamResolver
           }
      },
      {path:'user/change-password',component: UserChangePassword},
      { path: 'role', component: RoleComponent},
      { path: 'role/edit/:id', component: RoleAddComponent,
        resolve:{
              moduleList:ModuleResolver,
              roleList:RoleResolver,
        }        
      },
      { path: 'role/add', component: RoleAddComponent,
          resolve:{
                moduleList:ModuleResolver,
                roleList:RoleResolver,
            }        
      },
      { path: 'branch', component: BranchComponent,
          resolve:{
            countryList:CountryResolver,
            stateList:StateResolver,
          }           
      },
      //////Start Media
      { path: 'media', component: MediaListComponent},
      { path: 'media/view/:id', component: MediaViewComponent},
      { path: 'media/allot-job/:id', component: MediaAllotComponent,
             resolve:{ teamList:TeamResolver} 
      },
      { path: 'media/job-process/:id', component: MediaJobProcessComponent},
      { path: 'media/pre-inspection/:id', component: PreInspectionComponenet},
      { path: 'media/inspection/:id', component: InspectionComponent},
      { path: 'media/observation/:id', component: ObservationEditComponent},
      { path: 'media/daily-status/:id', component: DailyStatusComponent},
      { path: 'transfer-media', component: TransferListComponent},
      { path: 'media/transfer-media/:id', component: TransferEditComponent},
      { path: 'media/recovery-charges/:id', component: RecoveryChargesComponent},
      //////////////
     ////Media Out  
      { path: 'media-out', component: MediaOutComponent},
      { path: 'gate-pass', component: GatePassComponent},
      { path: 'inventory', component: InventoryListComponent},
      { path: 'inventory/edit/:id', component: InventoryAddComponent},
      { path: 'inventory/add', component: InventoryAddComponent},
      { path: 'access-denied',component:AccessDeniedComponent },
      { path: 'wiping-list', component: WipingList},
      { path: 'wiping-due-list', component: WipingDueList},
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
            ///Company
      { path: 'company', component: CompanyComponent,
          resolve:{
            stateList:StateResolver,
          } 
      },
	  { path: 'contact', component: ContactComponent},
    { path: 'payment-list', component: PaymentListComponent},
    { path: 'receipt', component: ReceiptComponent},
    { path: 'receipt/add/:id', component: ReceiptAddComponenet},
    { path: 'receipt/edit/:id', component: ReceiptAddComponenet},
    { path: 'email-template', component: EmailTemplatesListComponent},
    { path: 'email-template/add', component: EmailTemplatesAddComponent },
    { path: 'email-template/edit/:id', component: EmailTemplatesAddComponent },
    { path: 'credit/add/:id', component: CreditAddComponenet},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[BranchResolver,RoleResolver,TeamResolver,CountryResolver,StateResolver,ModuleResolver]
})
export class AdminRoutingModule { }
