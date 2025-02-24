import {Routes} from '@angular/router';
import {WelcomePageComponent} from './pages/welcome-page/welcome-page.component';
import {StudentLoginComponent} from './pages/login/student-login/student-login.component';
import {TeacherLoginComponent} from './pages/login/teacher-login/teacher-login.component';
import {StudentSignupComponent} from './pages/sign-up/student-signup/student-signup.component';
import {TeacherSignupComponent} from './pages/sign-up/teacher-signup/teacher-signup.component';

export const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'login/student', component: StudentLoginComponent},
  {path: 'login/teacher', component: TeacherLoginComponent},
  {path: 'sign-up/student', component: StudentSignupComponent},
  {path: 'sign-up/teacher', component: TeacherSignupComponent}
];
