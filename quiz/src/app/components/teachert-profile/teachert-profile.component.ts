import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/teacher';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-teachert-profile',
  templateUrl: './teachert-profile.component.html',
  styleUrls: ['./teachert-profile.component.scss']
})
export class TeachertProfileComponent implements OnInit {

  teacherID;
  NumberallQuizes;
  NumberPublishedQuizes;
  NumberSavedQuizes;
  PublishedQuizes = [];
  SavedQuizes = [];

  QuizArray: any;
  publish = true;
  save = false;

  teacher: Teacher = {};

  constructor(private userService: UserService, private quizService: QuizService, private router: Router) {
    this.teacherID = this.userService.CurrentUser.user.userId;

    this.userService.getTeacher(this.teacherID).subscribe(data => {
      this.teacher = data;

      this.quizService.getAllQuizes(this.teacherID).subscribe(data1 => {
        this.NumberallQuizes = data1.length;
      });

      this.quizService.getSavedQuiz(this.teacherID).subscribe(data2 => {
        this.NumberSavedQuizes = data2.length;
        this.SavedQuizes = data2;
      });

    });
  }

  profileUpdate() {
    this.router.navigate(['/updateTeacher', this.teacherID]);
  }

  viewQuiz(quizID) {
    this.router.navigate(['/updateQuize', quizID]);
  }

  publishQuizes() {
    this.publish = true;
    this.save = false;
    this.ngOnInit();
  }

  SaveQuizes() {
    this.save = true;
    this.publish = false;
    this.QuizArray = [];
    this.QuizArray = this.SavedQuizes;
  }

  ngOnInit() {

    this.quizService.getPublishQuiz(this.teacherID).subscribe(data => {
      this.NumberPublishedQuizes = data.length;
      this.QuizArray = this.PublishedQuizes = data;
    });

  }

}
