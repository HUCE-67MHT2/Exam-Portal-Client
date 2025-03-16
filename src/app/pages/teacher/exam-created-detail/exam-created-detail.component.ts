import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HeaderComponent } from "../../../layout/header/header.component";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-exam-created-detail',
  imports: [
    HeaderComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './exam-created-detail.component.html',
  styleUrl: './exam-created-detail.component.scss'
})
export class ExamCreatedDetailComponent implements OnInit {
  examCode: string = 'Mã không xác định';
  examName: string = 'Tên không xác định';
  examPassword: string = 'Mật khẩu không xác định';
  examType: string = 'Loại không xác định';
  showPassword: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

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
      if (params['password']) {
        this.examPassword = params['password'];
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onRowClick(exam: any) {
    console.log('Row clicked:', exam);
    // Add your logic here
  }
  studentsInExam = [
    { "name": "Nguyễn Văn A", "Code": "SV001", "points": 10, "status": "Chưa nộp bài" },
    { "name": "Nguyễn Văn B", "Code": "SV002", "points": 8, "status": "Đang làm" },
    { "name": "Nguyễn Văn C", "Code": "SV003", "points": 7, "status": "Đã nộp bài" },
    { "name": "Nguyễn Văn A", "Code": "SV001", "points": 10, "status": "Chưa nộp bài" },
    { "name": "Nguyễn Văn B", "Code": "SV002", "points": 8, "status": "Đang làm" },
    { "name": "Nguyễn Văn C", "Code": "SV003", "points": 7, "status": "Đã nộp bài" },
    { "name": "Nguyễn Văn A", "Code": "SV001", "points": 10, "status": "Chưa nộp bài" },
    { "name": "Nguyễn Văn B", "Code": "SV002", "points": 8, "status": "Đang làm" },
    { "name": "Nguyễn Văn C", "Code": "SV003", "points": 7, "status": "Đã nộp bài" },
    { "name": "Nguyễn Văn A", "Code": "SV001", "points": 10, "status": "Chưa nộp bài" },
    { "name": "Nguyễn Văn B", "Code": "SV002", "points": 8, "status": "Đang làm" },
    { "name": "Nguyễn Văn C", "Code": "SV003", "points": 7, "status": "Đã nộp bài" }
  ];

  examPaper = [
    { "id": "Đề 01", "duration": "120 phút", "dateCreated": "9/11/2024", "status": "Đã đóng" },
    { "id": "Đề 02", "duration": "120 phút", "dateCreated": "9/11/2024", "status": "Đã đóng" },
    { "id": "Đề 03", "duration": "120 phút", "dateCreated": "9/11/2024", "status": "Đang mở" },
    { "id": "Đề 04", "duration": "120 phút", "dateCreated": "9/11/2024", "status": "Đã đóng" },
    { "id": "Đề 05", "duration": "120 phút", "dateCreated": "9/11/2024", "status": "Đã đóng" },
    { "id": "Đề 06", "duration": "120 phút", "dateCreated": "9/11/2024", "status": "Đang mở" }
  ];

  createNewExamPaper() {

  }

  goBack() {
    this.router.navigate(['home/teacher']);
  }

  editExamPaper(paper: { id: string, duration: string, dateCreated: string, status: string }) {
    this.router.navigate(['teacher/edit-exam-paper', paper.id], {
      queryParams: {
        duration: paper.duration,
        dateCreated: paper.dateCreated,
        status: paper.status,
        name: this.examName,
        type: this.examType,
        examCode: this.examCode,
        password: this.examPassword
      }
    });
  }

  deleteExamPaper() {

  }
}
