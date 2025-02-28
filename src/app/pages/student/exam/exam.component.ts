import { Component } from '@angular/core';
import {HeaderStudentComponent} from '../../../layout/header/header-student/header-student.component';
import {SearchBarComponent} from '../../../layout/search-bar/search-bar.component';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-exam',
  imports: [
    HeaderStudentComponent,
    SearchBarComponent,
    NgForOf
  ],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent {
  constructor(private router: Router) {
  }
  exams = [
    { name: 'Toán', examCode: 'ABCXYZ', students: 50, tests: 5 },
    { name: 'Văn', examCode: 'XYZ123', students: 45, tests: 6 },
    { name: 'Anh', examCode: 'DEF456', students: 40, tests: 4 },
    { name: 'Lý', examCode: 'GHI789', students: 55, tests: 7 },
    { name: 'Hóa', examCode: 'JKL012', students: 60, tests: 8 },
    { name: 'Sinh', examCode: 'MNO345', students: 35, tests: 3 },
    { name: 'Sử', examCode: 'PQR678', students: 30, tests: 2 },
    { name: 'Địa', examCode: 'STU901', students: 25, tests: 1 },
  ];
  navigateToExamDetail(examCode: string) {
    this.router.navigate(['student/exam-detail', examCode]);
    console.log('Navigate to exam detail:', examCode);
  }
}
