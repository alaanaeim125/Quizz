import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-testquiz',
  templateUrl: './testquiz.component.html',
  styleUrls: ['./testquiz.component.scss']
})
export class TestquizComponent implements OnInit {

 Quiiz: any;
 selectedQuiiiz = [];
 correctAnswer = [];
 studentAnswers;
 QuizID;
 TeacherName;
 AboutQuiz;
  constructor(private quizService: QuizService, private activeRoute: ActivatedRoute,
              private userServ: UserService, private router: Router) {
    this.QuizID = this.activeRoute.snapshot.params.id;

    this.quizService.getOneQuiz(this.QuizID).subscribe(data => {
      this.Quiiz = data;
      this.correctAnswer = data.CorrectAnswer;
      const len = data.Question.length;

      for (let i = 0; i < len; i++) {
          const obj = {
            Question: data.Question[i],
            Answer1: data.Answers[i].Ans1,
            Answer2: data.Answers[i].Ans2,
            Answer3: data.Answers[i].Ans3,
            Answer4: data.Answers[i].Ans4,
            CorrectAnswer: data.CorrectAnswer[i]
          };
          this.selectedQuiiiz.push(obj);
          this.TeacherName = data.TeacherName;
          this.AboutQuiz = data.AboutQuiz;
      }
    });
   }


  result(AnswerStudent) {
    this.studentAnswers = Object.values(AnswerStudent); // get student answers as array

    let correctAns = 0;
    let i;
    for (i in this.correctAnswer) {
      if (this.correctAnswer[i] === this.studentAnswers[i]) {
        correctAns++;
      }
    }
    const Quizdegree = correctAns + ' / ' + this.studentAnswers.length;

    localStorage.setItem('AnswersStudent', this.studentAnswers);
    // localStorage.setItem('Score', Quizdegree);

    const res = {
      StudentId: this.userServ.CurrentUser.user.userId,
      QuizDegree: Quizdegree,
      QuizAbout: this.AboutQuiz,
      QuizID: this.QuizID,
      StudentAnswers: this.studentAnswers
    };
    this.quizService.SaveResultQuiiiz(res).subscribe(data => {
      console.log(data);
    });
    setTimeout(() => {
      this.router.navigate(['/result', this.QuizID]);
    }, 2000);
  }

  ngOnInit() {
  }

}
