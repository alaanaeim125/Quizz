import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userService: UserService;

  constructor(private userServ: UserService, private router: Router) {
    this.userService = userServ;
   }

  LogOut() {
    this.userService.LogOut();
    this.router.navigate(['/']);
  }

  loggedInUser() {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }


  ngOnInit() {
  }

}
