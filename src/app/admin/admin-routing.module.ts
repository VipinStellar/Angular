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
import { MediaInComponent } from './media-in/media-in.component';
import { MediaCaseDetail } from './media-in/media-case-details.component';
import { MediaAssessmentView } from  './media-in/media-assessment-view.component';
import{MediaPreComponent} from './media-in/media-pre.component';
import { MediaEdit } from './media-in/media-edit.component';
import { MediaAssessmentEdit } from './media-in/media-edit-assessment.component';
import { JobListComponent } from './media-in/job-list.component';
import { JobDetailStatusComponent } from './media-in/job-status-details.component';
import { UserChangePassword } from './user/user-change-password.component';
import { JobConfirmComponent } from './media-in/job-confirm.component';
import { ObservationView } from './media-in/observation-view.component';
import {ObservationEdit} from './media-in/observation-edit.component';
import { DailyStatus } from './media-in/daily-status.component';
import { GatePassComponent } from './media-in/gate-pass.component';
import { ObservationDetails } from './media-in/observation-details.component';
import { InventoryListComponent } from './inventory/inventory-list.component';
import { InventoryAddComponent } from './inventory/inventory-add-component';
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
      { path: 'media', component: MediaInComponent},
      { path: 'job-status', component: JobListComponent},
      { path: 'job-status/:id', component: JobDetailStatusComponent},
      { path: 'case-details/:id', component: MediaCaseDetail},
      { path: 'pre-analysis/:id', component: MediaPreComponent,
        resolve:{ teamList:TeamResolver}        
      },
      { path: 'pre-analysis/edit/:id', component: MediaEdit},
      { path: 'media-assessment/edit/:id', component: MediaAssessmentEdit},
      { path: 'transfer-media/:id', component: MediaPreComponent,
        resolve:{teamList:TeamResolver}        
      },
      { path: 'media-assessment/:id', component: MediaAssessmentView},
      { path: 'job-confirm', component: JobConfirmComponent},
      { path: 'observation/edit/:id', component: ObservationEdit},
      { path: 'observation/:id', component: ObservationView,
           resolve:{teamList:TeamResolver}  
      },
      { path: 'daily-status/:id', component: DailyStatus},
      { path: 'gate-pass', component: GatePassComponent},
      { path: 'observation-details/:id', component: ObservationDetails},
      { path: 'inventory', component: InventoryListComponent},
      { path: 'inventory/edit/:id', component: InventoryAddComponent},
      { path: 'inventory/add', component: InventoryAddComponent},
      { path: 'access-denied',component:AccessDeniedComponent },
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[BranchResolver,RoleResolver,TeamResolver,CountryResolver,StateResolver,ModuleResolver]
})
export class AdminRoutingModule { }
