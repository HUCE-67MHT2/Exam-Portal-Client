import { Component } from '@angular/core';
import {HeaderStudentComponent} from '../../../layout/header/header-student/header-student.component';
import {SearchBarComponent} from '../../../layout/search-bar/search-bar.component';
import {NgForOf} from '@angular/common';

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
  exams = [
    { name: 'Toán', classCode: 'ABCXYZ', students: 50, tests: 5 },
    { name: 'Văn', classCode: 'XYZ123', students: 45, tests: 6 },
    { name: 'Anh', classCode: 'DEF456', students: 40, tests: 4 },
    { name: 'Lý', classCode: 'GHI789', students: 55, tests: 7 },
    { name: 'Hóa', classCode: 'JKL012', students: 60, tests: 8 },
    { name: 'Sinh', classCode: 'MNO345', students: 35, tests: 3 },
    { name: 'Sử', classCode: 'PQR678', students: 30, tests: 2 },
    { name: 'Địa', classCode: 'STU901', students: 25, tests: 1 },
  ];
}
