import { Component } from '@angular/core';
import { SearchBarComponent } from "../../../../../layout/search-bar/search-bar.component";

@Component({
  selector: 'app-student-list',
  imports: [SearchBarComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent {

}
