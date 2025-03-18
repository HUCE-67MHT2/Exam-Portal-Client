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
    { "name": "Giải tích", "type": "Giữa kì", "examCode": "ABCXYZ", "tests": 1, "day": "2025-03-12", "status": "đang mở", "password": "A1B2C3" , "source" : "File" },
    { "name": "Giải tích", "type": "Cuối kì", "examCode": "XYZ123", "tests": 6, "day": "2025-03-12", "status": "đã đóng", "password": "D4E5F6" , "source" : "Auto-generated" },
    { "name": "UIAUIA", "type": "Giữa kì", "examCode": "DEF456", "tests": 1, "day": "2025-03-12", "status": "đang mở", "password": "G7H8I9" , "source" : "File" },
    { "name": "Cơ học địa chất MHT 2", "type": "Cuối kì", "examCode": "GHI789", "tests": 7, "day": "2025-03-12", "status": "đã đóng", "password": "J1K2L3" , "source": "Auto-generated" },
    { "name": "LTUDM", "type": "15 phút", "examCode": "JKL012", "tests": 1, "day": "2025-03-12", "status": "đang mở", "password": "M4N5O6" , "source": "File" },
    { "name": "IOT", "type": "15 phút", "examCode": "MNO345", "tests": 3, "day": "2025-03-12", "status": "đã đóng", "password": "P7Q8R9" , "source": "Auto-generated" },
    { "name": "UDKTM", "type": "15 phút", "examCode": "PQR678", "tests": 1, "day": "2025-03-12", "status": "đang mở", "password": "S1T2U3" , "source": "File" },
    { "name": "PTTKHTTT", "type": "15 phút", "examCode": "STU901", "tests": 1, "day": "2025-03-12", "status": "đã đóng", "password": "V4W5X6" , "source": "Auto-generated" },
  ]


  navigateToExamDetail(exam: { examCode: string, name: string, password: string, type: string, source: string, status: string }) {
    const route = exam.source === 'File' ? 'teacher/exam-created-with-file-detail' : 'teacher/exam-created-auto-detail';
    this.router.navigate([route, exam.examCode], {
      queryParams: {
        status: exam.status,
        name: exam.name,
        password: exam.password,
        type: exam.type
      }
    });
    console.log('Navigate to exam detail:', exam.examCode, exam.name, exam.password, exam.source);
  }
}
