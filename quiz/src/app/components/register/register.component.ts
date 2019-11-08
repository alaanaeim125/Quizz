import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  subjects = ['Arabic Language', 'English Language',
              'French Language', 'Biology Language',
              'Math Language', 'Computer Language', 'Social Studies'];
  showPassword = false;
  Type: any;
  typeUsser;
  iid: any;
  updateUser: any = {
    FullName : '',
    Email : '',
    Password : '',
    typeUser : '',
    Specialist : ''
  };

  // tslint:disable-next-line: quotemark
  fullnameExp = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
  emailRegEx = '^[a-zA-Z0-9]+@[a-zA-Z0-9]+[.]+[a-z]{2,3}$';
  checkEmailInDB = false;

  constructor(private userService: UserService, private router: Router, private activeRoute: ActivatedRoute) {
    this.iid = activeRoute.snapshot.params.id;
    if (this.iid) {
      const hrefArr = (window.location.href).split('/');
      const typeUser = hrefArr[hrefArr.length - 2];

      if (typeUser === 'updateStudent') {
        this.userService.getStudent(this.iid).subscribe(data => {
          this.updateUser = data;
          this.Type = typeUser;
        });
      } else if (typeUser === 'updateTeacher') {
        this.userService.getTeacher(this.iid).subscribe(data => {
          this.updateUser = data;
          this.Type = typeUser;
        });
      }

    } else { }
  }

  register(user) {

    if (user.typeUser === 'student') {
      if (this.Type === 'updateStudent') {
        this.userService.updateStudent(this.iid, user).subscribe(data => {
          setTimeout(() => {
            this.router.navigate(['/profilestudent', this.iid]);
          }, 3000);
        });
      } else {
        this.userService.registerNewUser(user).subscribe(data => {
          if (!data.error) {
            this.checkEmailInDB = false;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          } else {
            if (data.error.EmailCheck === false) {
              this.checkEmailInDB = true;
            }
          }
        });
      }
    } else {
      if (this.Type === 'updateTeacher') {
        this.userService.updateTeacher(this.iid, user).subscribe(data => {
          setTimeout(() => {
            this.router.navigate(['/profilestudent', this.iid]);
          }, 3000);
        });
      } else {
        this.userService.registerNewTeatcher(user).subscribe(data => {
          if (!data.error) {
            this.checkEmailInDB = false;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          } else {
            if (data.error.EmailCheck === false) {
              this.checkEmailInDB = true;
            }
          }
        });
      }
    }
  }

  ShowHidePassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
  }

}
