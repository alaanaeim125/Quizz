import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Student } from 'src/app/models/student';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  student: Student = {};
  studentID;
  count;
  QuizesExamIt = [];
  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router, private quizServ: QuizService) {

    this.studentID = activeRoute.snapshot.params.id;
    this.userService.getStudent(this.studentID).subscribe(data => {
      this.student = data;
    });


    this.quizServ.getAllStudentQuizTest(this.studentID).subscribe(data => {
      this.QuizesExamIt = data;
      this.count = data.length;
    });
  }


  profileUpdate() {
    this.router.navigate(['/updateStudent', this.studentID]);
  }

  ngOnInit() {
  }

}
