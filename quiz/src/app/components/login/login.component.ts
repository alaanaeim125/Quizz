import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailRegEx = '^[a-zA-Z0-9]+@[a-zA-Z0-9]+[.]+[a-z]{2,3}$';
  EmailExist = false;
  PassExist = false;
  showPassword = false;
  constructor(private userService: UserService, private router: Router) { }

  login(user) {

    if (user.typeUser === 'student') {
      this.userService.loginAsUser(user).subscribe(data => {

        if (!data.error) {
          localStorage.setItem('token', data.token);
          this.EmailExist = false;
          this.PassExist = false;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        } else {
          console.log(data.error);
          if (data.error.PassExist === false) {
            this.PassExist = true;
            this.EmailExist = false;
          } else {
            this.EmailExist = true;
            this.PassExist = false;
          }
        }
      });
    } else if (user.typeUser === 'teacher') {
      this.userService.loginAsTeacher(user).subscribe(data => {

        if (!data.error) {
          localStorage.setItem('token', data.token);
          this.EmailExist = false;
          this.PassExist = false;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        } else {
          console.log(data.error);
          if (data.error.PassExist === false) {
            this.PassExist = true;
            this.EmailExist = false;
          } else {
            this.EmailExist = true;
            this.PassExist = false;
          }
        }
      });
    }
  }

  ShowHidePassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
  }

}
