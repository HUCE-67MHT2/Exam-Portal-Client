import {Component} from '@angular/core';
import {HeaderComponent} from "../header.component";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header-teacher',
  imports: [
    HeaderComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header-teacher.component.html',
  styleUrl: './header-teacher.component.scss'
})
export class HeaderTeacherComponent {

}
