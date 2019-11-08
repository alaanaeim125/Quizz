import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain'
    })
  };

  registerNewUser(user): Observable<any> {
   return (this.http.post<any>('https://quiiz1.herokuapp.com/registerUser', user, this.httpOptions));
  }

  registerNewTeatcher(teacher): Observable<any> {
    return (this.http.post<any>('https://quiiz1.herokuapp.com/registerTeacher', teacher, this.httpOptions));
  }

  loginAsUser(user): Observable<any> {
    return (this.http.post<any>('https://quiiz1.herokuapp.com/loginUser', user, this.httpOptions));
  }

  loginAsTeacher(teacher): Observable<any> {
    return (this.http.post<any>('https://quiiz1.herokuapp.com/loginTeacher', teacher, this.httpOptions));
  }

  getStudent(id): Observable<Student> {
    return this.http.get<Student>(`https://quiiz1.herokuapp.com/getStudent/${id}`);
  }

  getTeacher(id): Observable<Teacher> {
    return this.http.get<Teacher>(`https://quiiz1.herokuapp.com/getTeacher/${id}`);
  }

  updateStudent(id, student): Observable<any> {
    return this.http.put<any>(`https://quiiz1.herokuapp.com/updateStudent/${id}`, student, this.httpOptions);
  }

  updateTeacher(id, teacher): Observable<any> {
    return this.http.put<any>(`https://quiiz1.herokuapp.com/updateTeacher/${id}`, teacher, this.httpOptions);
  }

  isLoggedIn() {
    // you can use this line instead of getTokenExpirationDate,  isTokenExpired
   // return tokenNotExpired();
    const jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');

    if (!token) {
       return false;
     } else {
       const expirationDate = jwtHelper.getTokenExpirationDate(token);
       const isExpired = jwtHelper.isTokenExpired(token);

       return !isExpired;
     }
  }

  LogOut() {
    localStorage.removeItem('token');
  }


  get CurrentUser() {
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelper();

    if (!token) {
      return null;
    } else {
      return jwtHelper.decodeToken(token);
    }
  }

}
