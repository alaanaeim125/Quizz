import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserService } from './services/user.service';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { AllowQuizGuard } from './services/allow-quiz.guard';
import { QuizService } from './services/quiz.service';
import { LoginregisterGuard } from './services/loginregister.guard';
import { TeachertProfileComponent } from './components/teachert-profile/teachert-profile.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { TestquizComponent } from './components/testquiz/testquiz.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomePageComponent,
    AddQuizComponent,
    TeachertProfileComponent,
    StudentProfileComponent,
    TestquizComponent,
    QuizResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, AllowQuizGuard, QuizService, LoginregisterGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
