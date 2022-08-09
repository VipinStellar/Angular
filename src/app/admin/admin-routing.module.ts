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
import { ProfileResolver } from './user/profile.resolver';
import { TeamResolver } from './user/teamresolver';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { RoleAddComponent } from './role/role-add.component';
import { MediaInComponent } from './media-in/media-in.component';
import { MediaCaseDetail } from './media-in/media-case-details.component';
import { MediaAssessmentView } from  './media-in/media-assessment-view.component';
import{MediaPreComponent} from './media-in/media-pre.component';
import { MediaEdit } from './media-in/media-edit.component';
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
            teamList:TeamResolver,
            profileResolver:ProfileResolver
           }
      },
      { path: 'role', component: RoleComponent,
            resolve:{
              profileResolver:ProfileResolver
            }
      },
      { path: 'role/edit/:id', component: RoleAddComponent,
        resolve:{
              moduleList:ModuleResolver,
              profileResolver:ProfileResolver,
              roleList:RoleResolver,
        }        
      },
      { path: 'role/add', component: RoleAddComponent,
          resolve:{
                moduleList:ModuleResolver,
                profileResolver:ProfileResolver,
                roleList:RoleResolver,
          }        
      },
      { path: 'branch', component: BranchComponent,
          resolve:{
            countryList:CountryResolver,
            stateList:StateResolver,
            profileResolver:ProfileResolver
          } 
          
      },
      { path: 'media', component: MediaInComponent,
          resolve:{
            profileResolver:ProfileResolver,
            
          } 
          
      },
      { path: 'case-details/:id', component: MediaCaseDetail,
        resolve:{
              profileResolver:ProfileResolver,
        }        
      },
      { path: 'pre-analysis/:id', component: MediaPreComponent,
        resolve:{
              profileResolver:ProfileResolver,
              teamList:TeamResolver,
        }        
      },
      { path: 'pre-analysis/edit/:id', component: MediaEdit,
        resolve:{
              profileResolver:ProfileResolver,
              teamList:TeamResolver,
        }        
      },
      { path: 'transfer-media/:id', component: MediaPreComponent,
      resolve:{
            profileResolver:ProfileResolver,
            teamList:TeamResolver,
      }        
      },
      { path: 'media-assessment/:id', component: MediaAssessmentView,
        resolve:{
              profileResolver:ProfileResolver,
        }        
      },
      { path: 'access-denied',component:AccessDeniedComponent },
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[BranchResolver,RoleResolver,TeamResolver,CountryResolver,StateResolver,ModuleResolver,ProfileResolver]
})
export class AdminRoutingModule { }
