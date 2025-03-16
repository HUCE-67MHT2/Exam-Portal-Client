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
  examName: string = 'Tên không xác định'; // Đặt giá trị mặc định để kiểm tra lỗi
  examType: string = 'Loại không xác định'; // Đặt giá trị mặc định để kiểm tra lỗi

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
      if (params['type']) {
        this.examType = params['type'];
      }
    });
  }
  exams = [
    { name: 'Đề 01', duration: '120 phút', dateCreated: '9/11/2024', status: 'Chưa làm' },
    { name: 'Đề 02', duration: '120 phút', dateCreated: '9/11/2024', status: 'Đang làm' },
    { name: 'Đề 03', duration: '120 phút', dateCreated: '9/11/2024', status: 'Đã làm' }
  ];
}
