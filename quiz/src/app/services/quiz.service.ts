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

    return this.http.post<any>('https://quiiz1.herokuapp.com/AddNewQuiz', quiz, httpOptions);
  }

  getOneQuiz(id): Observable<any> {
    return this.http.get<any>(`https://quiiz1.herokuapp.com/getOneQuiz/${id}`);
  }

  getAllQuizess(): Observable<any> {
    return this.http.get<any>(`https://quiiz1.herokuapp.com/getAllQuizess`);
  }

  getAllQuizes(id): Observable<any> {
    return this.http.get<any>(`https://quiiz1.herokuapp.com/getAllQuizes/${id}`);
  }

  getPublishQuiz(id): Observable<any> {
    return this.http.get<any>(`https://quiiz1.herokuapp.com/QuizesPublish/${id}`);
  }

  getAllPublishQuiz(): Observable<any> {
    return this.http.get<any>(`https://quiiz1.herokuapp.com/QuizesPublish`);
  }

  QuizesPublishAndSpecialist(subject): Observable<Quiz[]> {
    return this.http.get<[]>(`https://quiiz1.herokuapp.com/QuizesPublishAndSpecialist/${subject}`);
  }

  getSavedQuiz(id): Observable<any> {
    return this.http.get<any>(`https://quiiz1.herokuapp.com/QuizesSaved/${id}`);
  }


  updateQuiz(id, quiz): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain'
      })
    };
    return this.http.put<any>(`https://quiiz1.herokuapp.com/updateQuize/${id}`, quiz, httpOptions);
  }


  deleteQuiz(id): Observable<any> {
    return this.http.delete<any>(`https://quiiz1.herokuapp.com/deleteQuiz/${id}`);
  }


  // push result in database to use

  SaveResultQuiiiz(resQuiz): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain'
      })
    };
    return this.http.post<any>(`https://quiiz1.herokuapp.com/SaveResQuiz`, resQuiz, httpOptions);
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
    return this.http.post<any>(`https://quiiz1.herokuapp.com/OneQuizRes`, obj, httpOptions);
  }

  getAllStudentQuizTest(SID): Observable<any> {
    return this.http.get<any>(`https://quiiz1.herokuapp.com/AllResults/${SID}`);
  }
}
