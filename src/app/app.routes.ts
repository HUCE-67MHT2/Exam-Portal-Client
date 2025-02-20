import {Routes} from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
      path: '',
      component: LayoutComponent, // Dùng LayoutComponent như GlobalStyle
      children: [
        { path: 'home', component: HomeComponent }, // Các trang con sẽ nằm trong Layout
        
      ]
    },
    {path: 'login', component: LoginComponent}
  ];
