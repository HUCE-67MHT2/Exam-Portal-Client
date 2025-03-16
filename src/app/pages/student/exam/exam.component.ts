import {Component} from '@angular/core';
import {HeaderStudentComponent} from '../../../layout/header/header-student/header-student.component';
import {SearchBarComponent} from '../../../layout/search-bar/search-bar.component';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [
    HeaderStudentComponent,
    SearchBarComponent,
    NgForOf
  ],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent {
  constructor(private router: Router) {
  }

  exams = [
    { "name": "Giải tích", "type": "Giữa kì", "examCode": "ABCXYZ", "students": 50, "tests": 5 },
    { "name": "Giải tích", "type": "Cuối kì", "examCode": "XYZ123", "students": 45, "tests": 6 },
    { "name": "UIAUIA", "type": "Giữa kì", "examCode": "DEF456", "students": 40, "tests": 4 },
    { "name": "Cơ học địa chất MHT 2", "type": "Cuối kì", "examCode": "GHI789", "students": 55, "tests": 7 },
    { "name": "LTUDM", "type": "15 phút", "examCode": "JKL012", "students": 60, "tests": 8 },
    { "name": "IOT", "type": "15 phút", "examCode": "MNO345", "students": 35, "tests": 3 },
    { "name": "UDKTM", "type": "15 phút", "examCode": "PQR678", "students": 30, "tests": 2 },
    { "name": "PTTKHTTT", "type": "15 phút", "examCode": "STU901", "students": 25, "tests": 1 }
  ];

  navigateToExamDetail(exam: { examCode: string, name: string, type: string }) {
    this.router.navigate(['student/exam-detail', exam.examCode], {
      queryParams: {
        name: exam.name,
        type: exam.type
      }
    });
    console.log('Navigate to exam detail:', exam.examCode, exam.name);
  }
}
