import {Component} from '@angular/core';
import {HeaderStudentComponent} from '../../../layout/header/header-student/header-student.component';

@Component({
  selector: 'app-student-home',
  imports: [HeaderStudentComponent],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.scss'
})
export class StudentHomeComponent {
  constructor() {
  }

  scrollToSection(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({behavior: 'smooth'});
  }
}
