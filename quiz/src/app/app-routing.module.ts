import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { AllowQuizGuard } from './services/allow-quiz.guard';
import { LoginregisterGuard } from './services/loginregister.guard';
import { TeachertProfileComponent } from './components/teachert-profile/teachert-profile.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { TestquizComponent } from './components/testquiz/testquiz.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'addNewQuiz', component: AddQuizComponent, canActivate: [LoginregisterGuard, AllowQuizGuard] },
  { path: 'updateQuize/:id', component: AddQuizComponent, canActivate: [LoginregisterGuard, AllowQuizGuard] },
  { path: 'updateStudent/:id', component: RegisterComponent, canActivate: [LoginregisterGuard] },
  { path: 'updateTeacher/:id', component: RegisterComponent, canActivate: [LoginregisterGuard, AllowQuizGuard] },
  { path: 'profileteacher/:id', component: TeachertProfileComponent, canActivate: [LoginregisterGuard, AllowQuizGuard] },
  { path: 'profilestudent/:id', component: StudentProfileComponent, canActivate: [LoginregisterGuard] },
  { path: 'stratQuiz/:id', component: TestquizComponent, canActivate: [LoginregisterGuard] },
  { path: 'result/:id', component: QuizResultComponent, canActivate: [LoginregisterGuard] },
  { path: '', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
