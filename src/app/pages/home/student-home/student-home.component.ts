import {Component} from '@angular/core';
import {HeaderStudentComponent} from '../../../layout/header/header-student/header-student.component';

@Component({
  selector: 'app-student-home',
  imports: [HeaderStudentComponent],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.scss'
})
export class StudentHomeComponent {
  activeSection: string = 'schedule';

  scrollToSection(elementId: string): void {
    this.activeSection = elementId;
    document.getElementById(elementId)?.scrollIntoView({behavior: 'smooth'});
  }
}
