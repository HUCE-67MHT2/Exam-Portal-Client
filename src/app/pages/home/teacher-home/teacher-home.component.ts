import { Component } from '@angular/core';
import { SearchBarComponent } from "../../../layout/search-bar/search-bar.component";
import { HeaderComponent } from "../../../layout/header/header.component";

@Component({
  selector: 'app-teacher-home',
  imports: [SearchBarComponent, HeaderComponent],
  templateUrl: './teacher-home.component.html',
  styleUrl: './teacher-home.component.scss'
})
export class TeacherHomeComponent {

}
