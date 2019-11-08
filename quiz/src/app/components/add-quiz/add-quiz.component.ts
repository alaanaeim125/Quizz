import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from '../../services/user.service';
import { Teacher } from '../../models/teacher';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

  public quiz = new Quiz();

  ArrayQuizes = [];

  ArrayQuestions = [];
  ArrayCorrctAns = [];
  ArrayAnswers = [];
  Questions;
  Answers = {};
  CorrectAns;

  /*-------------------------- update Quiiiiz -----------------------------*/
  iid;
  selectedQuiiiz = [];
  quizPublish;
  teacher: Teacher;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private userService: UserService,
    private activeServ: ActivatedRoute
  ) {
    this.iid = activeServ.snapshot.params.id;

    // get teacher Information
    this.userService.getTeacher(this.userService.CurrentUser.user.userId).subscribe(data => {
      this.teacher = data;
    });

    if (this.iid) {
      this.quizService.getOneQuiz(this.iid).subscribe(data => {

        const len = data.Question.length;
        this.quizPublish = data.Publish;

        // tslint:disable-next-line: forin
        for (let i = 0; i < len; i++) {
            const obj = {
              Question: data.Question[i],
              Answer1: data.Answers[i].Ans1,
              Answer2: data.Answers[i].Ans2,
              Answer3: data.Answers[i].Ans3,
              Answer4: data.Answers[i].Ans4,
              CorrectAnswer: data.CorrectAnswer[i],
              Publish: data.Publish,
              AboutQuiz: data.AboutQuiz
            };
           // console.log(obj);
            this.selectedQuiiiz.push(obj);
        }
      });
      this.ArrayQuizes = [];
      this.ArrayQuizes = this.selectedQuiiiz;
    }
  }


  ngOnInit() {
    if (!this.iid) {
      this.ArrayQuizes.push(this.quiz);
    }
  }

  addAnotherQuiz() {
    this.quiz = new Quiz();
    this.ArrayQuizes.push(this.quiz);
  }

  RemoveQuestion(i) {
    this.ArrayQuizes.splice(i, 1);
  }

  DeleteQuiz() {
    const res = confirm('You Agree To Delete Quiiz!');
    if (res === true) {
      this.quizService.deleteQuiz(this.iid).subscribe(data => {});
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
    }
  }


  SaveQuiz(Quizz) {

    for (const quizz of this.ArrayQuizes) {
      // make Array Of Question
      this.Questions = quizz.Question;
      this.ArrayQuestions.push(this.Questions);

      // make Array Of Correct Answer
      this.CorrectAns = quizz.CorrectAnswer;
      this.ArrayCorrctAns.push(this.CorrectAns);

      // make Array Of Answers
      this.Answers = { Ans1: quizz.Answer1, Ans2: quizz.Answer2, Ans3: quizz.Answer3, Ans4: quizz.Answer4 };
      this.ArrayAnswers.push(this.Answers);
    }

    const AllQuiz = {
      Question: this.ArrayQuestions,
      Answers: this.ArrayAnswers,
      CorrectAnswer: this.ArrayCorrctAns,
      TeacherName: this.teacher.FullName,
      TeacherId: this.teacher._id,
      Specialist: this.teacher.Specialist,
      Publish: Quizz.Publish,
      AboutQuiz: Quizz.AboutQuiz
    };

    if (this.iid) {
      this.quizService.updateQuiz(this.iid, AllQuiz).subscribe(data => {
        if (data) {
          console.log('Sucess Update Quizzzz');
          setTimeout(() => {
          this.router.navigate(['/profileteacher', this.userService.CurrentUser.user.userId]);
        }, 3000);
      } else {
          console.log(data.error);
        }
      });
    } else {
      this.quizService.AddNewQuiz(AllQuiz).subscribe(data => {
        if (data) {
          console.log('Sucess Added Quizzzzz');
          setTimeout(() => {
            this.router.navigate(['/profileteacher', this.userService.CurrentUser.user.userId]);
          }, 3000);
        } else {
          console.log(data.error);
        }
      });
    }
  }



}
