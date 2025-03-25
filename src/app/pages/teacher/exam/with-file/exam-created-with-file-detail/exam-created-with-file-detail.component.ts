import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-exam-created-with-file-detail',
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './exam-created-with-file-detail.component.html',
  styleUrl: './exam-created-with-file-detail.component.scss'
})
export class ExamCreatedWithFileDetailComponent implements OnInit {
  examID: string = 'Mã không xác định';
  examName: string = 'Tên không xác định';
  examPassword: string = 'Mật khẩu không xác định';
  examType: string = 'Loại không xác định';
  examStatus: string = 'Trạng thái không xác định';
  showPassword: boolean = false;
  editExamPaperStatus: boolean = false;
  studentsInExam = [
    {"name": "Nguyễn Văn A", "Code": "SV001", "points": 10, "status": "Chưa nộp bài"},
    {"name": "Nguyễn Văn B", "Code": "SV002", "points": 8, "status": "Đang làm"},
    {"name": "Nguyễn Văn C", "Code": "SV003", "points": 7, "status": "Đã nộp bài"},
    {"name": "Nguyễn Văn A", "Code": "SV001", "points": 10, "status": "Chưa nộp bài"},
    {"name": "Nguyễn Văn B", "Code": "SV002", "points": 8, "status": "Đang làm"},
    {"name": "Nguyễn Văn C", "Code": "SV003", "points": 7, "status": "Đã nộp bài"},
    {"name": "Nguyễn Văn A", "Code": "SV001", "points": 10, "status": "Chưa nộp bài"},
    {"name": "Nguyễn Văn B", "Code": "SV002", "points": 8, "status": "Đang làm"},
    {"name": "Nguyễn Văn C", "Code": "SV003", "points": 7, "status": "Đã nộp bài"},
    {"name": "Nguyễn Văn A", "Code": "SV001", "points": 10, "status": "Chưa nộp bài"},
    {"name": "Nguyễn Văn B", "Code": "SV002", "points": 8, "status": "Đang làm"},
    {"name": "Nguyễn Văn C", "Code": "SV003", "points": 7, "status": "Đã nộp bài"}
  ];
  examPaper = [
    {"id": "Đề 01", "duration": "120 phút", "dateCreated": "9/11/2024",}
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('examID');
    if (param) {
      this.examID = param;
    }
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.examName = params['name'];
      }
      if (params['type']) {
        this.examType = params['type'];
      }
      if (params['status']) {
        this.examStatus = params['status'];
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

  goBack() {
    this.router.navigate(['home/teacher']);
  }

  editExamPaper(paper: { id: string, duration: string, dateCreated: string }) {
    this.router.navigate(['teacher/edit-exam-paper', paper.id], {
      queryParams: {
        duration: paper.duration,
        dateCreated: paper.dateCreated,
        name: this.examName,
        type: this.examType,
        examCode: this.examID,
        password: this.examPassword,
        status: this.examStatus
      }
    });
  }

  deleteExamPaper() {

  }

  editExam() {
    this.editExamPaperStatus = !this.editExamPaperStatus;
  }
}
