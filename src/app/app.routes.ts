import {Routes} from '@angular/router';
import {WelcomePageComponent} from './pages/welcome-page/welcome-page.component';
import {StudentLoginComponent} from './pages/login/student-login/student-login.component';
import {TeacherLoginComponent} from './pages/login/teacher-login/teacher-login.component';
import {StudentSignupComponent} from './pages/sign-up/student-signup/student-signup.component';
import {TeacherSignupComponent} from './pages/sign-up/teacher-signup/teacher-signup.component';
import {StudentHomeComponent} from './pages/home/student-home/student-home.component';
import {TeacherHomeComponent} from './pages/home/teacher-home/teacher-home.component';
import {ExamComponent} from './pages/student/exam/exam.component';
import {DoTestComponent} from './pages/student/do-test/do-test.component';
import {ResultsComponent} from './pages/student/results/results.component';
import {UserFormComponent} from './shared/components/user-form/user-form.component';
import {ExamDetailComponent} from './pages/student/exam-detail/exam-detail.component';
import {ExamCreateTypeComponent} from './pages/teacher/exam-create-type/exam-create-type.component';
import {
  ExamCreateWithFileComponent
} from './pages/teacher/exam/with-file/exam-create-with-file/exam-create-with-file.component';
import {
  CreateExamSessionComponent
} from './pages/teacher/exam_session/create-exam-session/create-exam-session.component';
import {
  ExamSessionDashboardComponent
} from './pages/teacher/exam_session/exam-session-dashboard/exam-session-dashboard.component';
import {
  CreateAutoGenerateComponent
} from './pages/teacher/exam/auto-generate/create-auto-generate/create-auto-generate.component'
import {LoadingComponent} from './layout/loading/loading.component';

export const routes: Routes = [

  {path: '', component: WelcomePageComponent},
  {path: 'login/student', component: StudentLoginComponent},
  {path: 'login/teacher', component: TeacherLoginComponent},
  {path: 'sign-up/student', component: StudentSignupComponent},
  {path: 'sign-up/teacher', component: TeacherSignupComponent},
  {path: 'home/student', component: StudentHomeComponent},
  {path: 'home/teacher', component: TeacherHomeComponent},
  {path: 'student/exam', component: ExamComponent},
  {path: 'student/do-test', component: DoTestComponent},
  {path: 'student/results', component: ResultsComponent},
  {path: 'user-form', component: UserFormComponent},
  {path: 'student/results', component: ResultsComponent},
  {path: 'student/exam-detail/:examCode', component: ExamDetailComponent},
  {path: 'student/exam-detail', component: ExamDetailComponent},
  {path: 'teacher/exam-create-type', component: ExamCreateTypeComponent},
  {path: 'teacher/exam-create-with-file', component: ExamCreateWithFileComponent},
  {path: 'teacher/create-exam-session', component: CreateExamSessionComponent},
  {path: 'teacher/exam-session-dashboard', component: ExamSessionDashboardComponent},
  {path: 'teacher/exam-create-auto-generate', component: CreateAutoGenerateComponent},
  {path: 'loading', component: LoadingComponent}
];
