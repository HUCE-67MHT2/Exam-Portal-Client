import { Routes } from '@angular/router';
    import { LayoutComponent } from './layout/layout.component';
    import { WelcomePageComponent } from './welcome-page/welcome-page.component';
    import { StudentComponent as LoginStudentComponent } from './login/student/student.component';
    import { TeacherComponent as LoginTeacherComponent } from './login/teacher/teacher.component';
    import { StudentComponent as SignUpStudentComponent } from './sign_up/student/student.component';
    import { TeacherComponent as SignUpTeacherComponent } from './sign_up/teacher/teacher.component';

    export const routes: Routes = [
      // Home route
      {
        path: '',
        component: WelcomePageComponent,
      },
      // Login routes
      {
        path: 'login',
        children: [
          {
            path: 'student',
            component: LoginStudentComponent,
          },
          {
            path: 'teacher',
            component: LoginTeacherComponent,
          },
        ],
      },

      // Sign-up routes
      {
        path: 'sign_up',
        children: [
          {
            path: 'student',
            component: SignUpStudentComponent,
          },
          {
            path: 'teacher',
            component: SignUpTeacherComponent,
          },
        ],
      },

      // Layout route
      {
        path: 'layout',
        component: LayoutComponent,
        children: [
          // Add child routes here if needed
        ],
      },
    ];
