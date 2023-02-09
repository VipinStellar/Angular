import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AuthUser } from 'src/app/_models/authuser';
import { UserService } from './../../_services/user.service';
import { Router} from '@angular/router';
import { Permission } from './../../_helpers/permission';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers:[Permission]
})
export class HeaderComponent implements OnInit {
  user: AuthUser;
  assignedRole:[];
  constructor(public permission:Permission, private toastrService:ToastrService,  private accountService:AccountService,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
   this.user =  this.accountService.userValue;
  }

  logout() {
    let data = [];
    this.userService.logout(data).subscribe( data => {
      this.accountService.logout();
      this.toastrService.success('User logged out successfully','Success!');
  });
  } 

}
