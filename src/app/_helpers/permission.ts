import { Injectable } from '@angular/core';
import { AccountService  } from './../_services/account.service';
@Injectable()

export class Permission {
   userRoleAssign;

  constructor(private accountService: AccountService) {
    this.userRoleAssign = this.accountService.userValue['assignRole'];
    }
   
    public viewPermission(): boolean
    {
        return true;
    }

    public editPermission(currentUrl:string):boolean
    {
      return this.checkPermission(currentUrl,'modify');
    }

    public deletePermission(currentUrl:string):boolean
    {
      return this.checkPermission(currentUrl,'delete');
    }

    public PermissionForAccess(currentUrl:string):boolean
      {   
          return this.checkPermission(currentUrl,'access');
      }

    public checkPermission (currentUrl,access)
    {
          let assignAccess = JSON.parse(this.userRoleAssign['assign']);
          let assignUrl = JSON.stringify(assignAccess[access]);
          if (currentUrl != undefined && currentUrl != null && currentUrl != '' && currentUrl != '/' && assignUrl.indexOf(currentUrl) !== -1) {
              return true
          }
          return false;
    }
}
