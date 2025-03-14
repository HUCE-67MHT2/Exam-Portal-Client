import {Component} from '@angular/core';
import {SearchBarComponent} from '../../../layout/search-bar/search-bar.component';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {CreateButtonComponent} from '../../../layout/button/create-button/create-button.component';
import {HeaderComponent} from '../../../layout/header/header.component';

@Component({
  selector: 'app-home-teacher',
  standalone: true,
  imports: [
    SearchBarComponent,
    NgForOf,
    CreateButtonComponent,
    HeaderComponent
  ],
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent {
  constructor(private router: Router) {
  }

  exams = [
    { "name": "Giữa kì - Giải tích", "examCode": "ABCXYZ", "tests": 5, "day": "2025-03-12", "status": "đang mở", "password": "A1B2C3" },
    { "name": "Cuối kì - Giải tích", "examCode": "XYZ123", "tests": 6, "day": "2025-03-12", "status": "đã đóng", "password": "D4E5F6" },
    { "name": "Giữa kì - UIAUIA", "examCode": "DEF456", "tests": 4, "day": "2025-03-12", "status": "đang mở", "password": "G7H8I9" },
    { "name": "Cuối kì - Cơ học địa chất MHT 2", "examCode": "GHI789", "tests": 7, "day": "2025-03-12", "status": "đã đóng", "password": "J1K2L3" },
    { "name": "15 phút - LTUDM", "examCode": "JKL012", "tests": 8, "day": "2025-03-12", "status": "đang mở", "password": "M4N5O6" },
    { "name": "15 phút - IOT", "examCode": "MNO345", "tests": 3, "day": "2025-03-12", "status": "đã đóng", "password": "P7Q8R9" },
    { "name": "15 phút - UDKTM", "examCode": "PQR678", "tests": 2, "day": "2025-03-12", "status": "đang mở", "password": "S1T2U3" },
    { "name": "15 phút - PTTKHTTT", "examCode": "STU901", "tests": 1, "day": "2025-03-12", "status": "đã đóng", "password": "V4W5X6" }
  ]

  navigateToExamDetail(exam: { examCode: string, name: string, password: string }) {
    this.router.navigate(['teacher/exam-created-detail', exam.examCode], { queryParams: { name: exam.name, password: exam.password } });
    console.log('Navigate to exam detail:', exam.examCode, exam.name, exam.password);
  };
}
