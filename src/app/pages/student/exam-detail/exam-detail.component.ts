import { Component } from '@angular/core';
import {HeaderStudentComponent} from '../../../layout/header/header-student/header-student.component';
import {SearchBarComponent} from '../../../layout/search-bar/search-bar.component';
import {NgForOf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-exam-detail',
  imports: [
    HeaderStudentComponent,
    SearchBarComponent,
    NgForOf
  ],
  templateUrl: './exam-detail.component.html',
  styleUrl: './exam-detail.component.scss'
})
export class ExamDetailComponent {
  examCode: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.examCode = this.route.snapshot.paramMap.get('examCode')!;
    // Fetch and display the exam details based on the classCode
  }
  exams = [
    { name: 'Toán cuối kỳ', duration: '120 phút', dateCreated: '9/11/2024', status: 'Chưa làm' },
    { name: 'Toán giữa kỳ', duration: '120 phút', dateCreated: '9/11/2024', status: 'Đang làm' },
    { name: 'Toán 1 tiết', duration: '60 phút', dateCreated: '9/11/2024', status: 'Đã làm' }
  ];

}
