import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../../../../layout/header/header.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-exam-created-auto-detail',
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './exam-created-auto-detail.component.html',
  styleUrl: './exam-created-auto-detail.component.scss'
})
export class ExamCreatedAutoDetailComponent implements OnInit {
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
    { "id": "Đề 01", "duration": "120 phút", "dateCreated": "9/11/2024", "status": "Đã đóng" },
    { "id": "Đề 01", "duration": "120 phút", "dateCreated": "9/11/2024", "status": "Đã đóng" },
    { "id": "Đề 01", "duration": "120 phút", "dateCreated": "9/11/2024", "status": "Đã đóng" }
  ];

  createNewExamPaper() {
    this.router.navigate(['teacher/create-new-exam-paper'], {
      queryParams: {
        name: this.examName,
        type: this.examType,
        examCode: this.examCode,
        password: this.examPassword
      }
    });
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
