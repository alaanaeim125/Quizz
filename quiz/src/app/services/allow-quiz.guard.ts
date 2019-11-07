import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AllowQuizGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    } else {
      const jwtHelper = new JwtHelper();
      const tokenAfterDecode = jwtHelper.decodeToken(token);

      if (tokenAfterDecode.user.typeUser === 'teacher') {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
  }
}
