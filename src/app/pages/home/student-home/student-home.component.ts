import {Component} from '@angular/core';
import {HeaderStudentComponent} from '../../../layout/header/header-student/header-student.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-student-home',
  imports: [HeaderStudentComponent, CommonModule],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.scss'
})
export class StudentHomeComponent {
  activeSection: string = 'schedule';
  achievementView: string = 'general'; // Default view

  scrollToSection(elementId: string): void {
    this.activeSection = elementId;
    document.getElementById(elementId)?.scrollIntoView({behavior: 'smooth'});
  }

  switchAchievementView(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.achievementView = select.value;
  }
}
