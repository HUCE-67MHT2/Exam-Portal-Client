import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HeaderStudentComponent} from "../../../layout/header/header-student/header-student.component";
import {SearchBarComponent} from "../../../layout/search-bar/search-bar.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  imports: [
    HeaderStudentComponent,
    SearchBarComponent,
    NgForOf
  ],
  styleUrl: './exam-detail.component.scss'
})
export class ExamDetailComponent implements OnInit {
  examCode: string = 'Mã không xác định'; // Đặt giá trị mặc định để kiểm tra lỗi
  examName: string = 'Tên không xác định';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('examCode');
    if (param) {
      this.examCode = param;
    }
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.examName = params['name'];
      }
    });
  }
  exams = [
    { name: 'Toán cuối kỳ', duration: '120 phút', dateCreated: '9/11/2024', status: 'Chưa làm' },
    { name: 'Toán giữa kỳ', duration: '120 phút', dateCreated: '9/11/2024', status: 'Đang làm' },
    { name: 'Toán 1 tiết', duration: '60 phút', dateCreated: '9/11/2024', status: 'Đã làm' }
  ];
}
