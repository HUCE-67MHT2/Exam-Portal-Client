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
    {name: 'Giữa kì - Giải tích', examCode: 'ABCXYZ', students: 50, tests: 5},
    {name: 'Cuối kì - Giải tích', examCode: 'XYZ123', students: 45, tests: 6},
    {name: 'Giữa kì - UIAUIA', examCode: 'DEF456', students: 40, tests: 4},
    {name: 'Cuối kì - Cơ học địa chất MHT 2', examCode: 'GHI789', students: 55, tests: 7},
    {name: '15 phút - LTUDM', examCode: 'JKL012', students: 60, tests: 8},
    {name: '15 phút - IOT', examCode: 'MNO345', students: 35, tests: 3},
    {name: '15 phút - UDKTM', examCode: 'PQR678', students: 30, tests: 2},
    {name: '15 phút - PTTKHTTT', examCode: 'STU901', students: 25, tests: 1},
  ];

  navigateToExamDetail(exam: { examCode: string, name: string }) {
    this.router.navigate(['student/exam-detail', exam.examCode], {queryParams: {name: exam.name}});
    console.log('Navigate to exam detail:', exam.examCode, exam.name);
  };
}
