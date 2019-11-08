import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: max-line-length
  subjects = ['Arabic Language', 'English Language', 'French Language', 'Biology Language', 'Math Language', 'Computer Language', 'Social Studies'];
  AllSubjCount;
  AllQuizes: Quiz[];
  filteredQuizes: Quiz[];
  subject: string;
  subscribe: Subscription;

  constructor(private quizService: QuizService, private activeRoute: ActivatedRoute, private router: Router) {

    this.activeRoute.queryParams.subscribe(params => {
      this.subject = params.subject;
    });

    this.quizService.getAllPublishQuiz().subscribe(data => {
      this.filteredQuizes = this.AllQuizes = data;
      this.AllSubjCount = this.filteredQuizes.length;
    });
   }

  ngOnInit() {
    if (this.subject) {
      this.quizService.QuizesPublishAndSpecialist(this.subject).subscribe(data => {
        this.filteredQuizes = data;
      });
    } else {
      this.filteredQuizes = this.AllQuizes;
    }
  }

  filterQuizes() {
    this.ngOnInit();
    setTimeout(() => {
      this.ngOnInit();
    }, 200);
   }

   homePage() {
     this.filterQuizes();
   }
   ngOnDestroy() {
   }

}
