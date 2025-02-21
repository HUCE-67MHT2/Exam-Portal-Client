import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { StudentComponent as LoginStudentComponent } from './login/student/student.component';
import { TeacherComponent as LoginTeacherComponent } from './login/teacher/teacher.component';
import { StudentComponent as SignUpStudentComponent } from './sign_up/student/student.component';
import { TeacherComponent as SignUpTeacherComponent } from './sign_up/teacher/teacher.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent, // Use WelcomePageComponent for the home page
  },
  {
    path: 'login/student',
    component: LoginStudentComponent, // Use LoginStudentComponent for student login
  },
  {
    path: 'login/teacher',
    component: LoginTeacherComponent, // Use LoginTeacherComponent for teacher login
  },
  {
    path: 'sign_up/student',
    component: SignUpStudentComponent, // Use SignUpStudentComponent for student sign-up
  },
  {
    path: 'sign_up/teacher',
    component: SignUpTeacherComponent, // Use SignUpTeacherComponent for teacher sign-up
  },
  {
    path: 'layout',
    component: LayoutComponent, // Use LayoutComponent as a global style
    children: [
      // Add child routes here if needed
    ]
  },
];
