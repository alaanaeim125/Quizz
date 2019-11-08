import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  Quiiz: any;
  selectedQuiiiz = [];
  correctAnswer = [];
  studentAnswers = [];
  ShowHideCorrect = [];
  score;
  StudenName;
  QuizID;

  constructor(private quizService: QuizService, private activeRoute: ActivatedRoute, private userServ: UserService) {
      this.QuizID = this.activeRoute.snapshot.params.id;
      this.StudenName = userServ.CurrentUser.user.FullName;
      this.studentAnswers = localStorage.getItem('AnswersStudent').split(',');
      // this.score = localStorage.getItem('Score');

      this.quizService.OneQuizRes(this.userServ.CurrentUser.user.userId, this.QuizID).subscribe(data => {
        this.score = data.QuizDegree;
      });

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
      }

      let x;
      // tslint:disable-next-line: forin
      for (x in this.correctAnswer) {
        if (this.correctAnswer[x] === this.studentAnswers[x]) {
          this.ShowHideCorrect.push('true');
        } else {
          this.ShowHideCorrect.push('false');
        }
      }
    });
}

  ngOnInit() {
  }

}
