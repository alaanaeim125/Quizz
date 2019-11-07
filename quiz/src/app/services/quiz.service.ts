import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

    // For Refresh page use subject rxjs as real time

    private listeners = new Subject<any>();
    listen(): Observable<any> {
      return this.listeners.asObservable();
    }
    filter(filterBy: string) {
      this.listeners.next(filterBy);
    }

  constructor(private http: HttpClient) { }

  AddNewQuiz(quiz): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain'
      })
    };

    return this.http.post<any>('http://localhost:8080/AddNewQuiz', quiz, httpOptions);
  }

  getOneQuiz(id): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/getOneQuiz/${id}`);
  }

  getAllQuizess(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/getAllQuizess`);
  }

  getAllQuizes(id): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/getAllQuizes/${id}`);
  }

  getPublishQuiz(id): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/QuizesPublish/${id}`);
  }

  getAllPublishQuiz(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/QuizesPublish`);
  }

  QuizesPublishAndSpecialist(subject): Observable<Quiz[]> {
    return this.http.get<[]>(`http://localhost:8080/QuizesPublishAndSpecialist/${subject}`);
  }

  getSavedQuiz(id): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/QuizesSaved/${id}`);
  }


  updateQuiz(id, quiz): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain'
      })
    };
    return this.http.put<any>(`http://localhost:8080/updateQuize/${id}`, quiz, httpOptions);
  }


  deleteQuiz(id): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/deleteQuiz/${id}`);
  }


  // push result in database to use

  SaveResultQuiiiz(resQuiz): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain'
      })
    };
    return this.http.post<any>(`http://localhost:8080/SaveResQuiz`, resQuiz, httpOptions);
  }

  OneQuizRes(SID, QID): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain'
      })
    };

    const obj = {
      StudentId: SID,
      QuizID: QID
    };
    return this.http.post<any>(`http://localhost:8080/OneQuizRes`, obj, httpOptions);
  }

  getAllStudentQuizTest(SID): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/AllResults/${SID}`);
  }
}
