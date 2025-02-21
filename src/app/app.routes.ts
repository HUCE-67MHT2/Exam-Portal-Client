import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent, // Sử dụng WelcomePageComponent cho trang đầu tiên
  },
  {
    path: 'layout',
    component: LayoutComponent, // Dùng LayoutComponent như GlobalStyle
    children: [
    ]
  },
  { path: 'login', component: LoginComponent }
];
