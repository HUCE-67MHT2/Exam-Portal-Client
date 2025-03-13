import {Component} from '@angular/core';
import {HeaderStudentComponent} from '../../../layout/header/header-student/header-student.component';
import {SearchBarComponent} from '../../../layout/search-bar/search-bar.component';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {FindButtonComponent} from '../../../layout/button-form/find-button/find-button.component';

@Component({
  selector: 'app-home-teacher',
  standalone: true,
  imports: [
    HeaderStudentComponent,
    SearchBarComponent,
    NgForOf,
    FindButtonComponent
  ],
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent {
  constructor(private router: Router) {
  }

  exams = [
    { "name": "Giữa kì - Giải tích", "examCode": "ABCXYZ", "tests": 5, "day": "2025-03-12", "status": "đang mở" },
    { "name": "Cuối kì - Giải tích", "examCode": "XYZ123", "tests": 6, "day": "2025-03-12", "status": "đã đóng" },
    { "name": "Giữa kì - UIAUIA", "examCode": "DEF456", "tests": 4, "day": "2025-03-12", "status": "đang mở" },
    { "name": "Cuối kì - Cơ học địa chất MHT 2", "examCode": "GHI789", "tests": 7, "day": "2025-03-12", "status": "đã đóng" },
    { "name": "15 phút - LTUDM", "examCode": "JKL012", "tests": 8, "day": "2025-03-12", "status": "đang mở" },
    { "name": "15 phút - IOT", "examCode": "MNO345", "tests": 3, "day": "2025-03-12", "status": "đã đóng" },
    { "name": "15 phút - UDKTM", "examCode": "PQR678", "tests": 2, "day": "2025-03-12", "status": "đang mở" },
    { "name": "15 phút - PTTKHTTT", "examCode": "STU901", "tests": 1, "day": "2025-03-12", "status": "đã đóng" }
  ];

  navigateToExamDetail(exam: { examCode: string, name: string }) {
    this.router.navigate(['student/exam-detail', exam.examCode], {queryParams: {name: exam.name}});
    console.log('Navigate to exam detail:', exam.examCode, exam.name);
  };
}
