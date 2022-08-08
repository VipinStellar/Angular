import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AuthUser } from 'src/app/_models/authuser';
import { UserService } from './../../_services/user.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  user: AuthUser;
  assignRole;
  constructor(private toastrService:ToastrService,  private accountService:AccountService,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
   this.user =  this.accountService.userValue;
   this.userService.getAssignRole().subscribe( data => {
     let res = data as any;
     let tmp = JSON.parse(res.assign);
     tmp = tmp['access'];
     this.assignRole = JSON.stringify(tmp);
  });
  }

  logout() {
    let data = [];
    this.userService.logout(data).subscribe( data => {
      this.accountService.logout();
      this.toastrService.success('User logged out successfully','Success!');
  });
  } 

  isAccess(url:string)
  {

    if(url != undefined && url !=null && url !='' && url !='/' && this.assignRole != undefined &&  this.assignRole.indexOf(url) !== -1)
    {
      return true
    }
    return false;
  }

}
