import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CreateButtonComponent} from '../../../layout/button/create-button/create-button.component';
import {SearchBarComponent} from '../../../layout/search-bar/search-bar.component';
import {HeaderComponent} from '../../../layout/header/header.component';
import {DatePipe, NgForOf} from '@angular/common';
import {ExamSession} from '../../../core/models/examSession.model';

@Component({
  selector: 'app-home-teacher',
  standalone: true,
  templateUrl: './teacher-home.component.html',
  imports: [
    CreateButtonComponent,
    SearchBarComponent,
    HeaderComponent,
    NgForOf,
  ],
  styleUrls: ['./teacher-home.component.scss'],
  providers: [DatePipe]
})
export class TeacherHomeComponent implements OnInit {
  examSessionList: ExamSession[] = [
    {
      id: 1,
      teacher_id: 101,
      name: "Kỳ thi giữa kỳ Toán",
      description: "Bài kiểm tra giữa kỳ môn Toán học",
      start_date: "08:00 10-04-2025",
      end_date: "10:00 10-04-2025",
      create_date: "14:30 20-03-2025",
      code: "TOAN2025",
      password: "toan123",
      type: "upload-file",
      status: "Chưa mở"
    },
    {
      id: 2,
      teacher_id: 102,
      name: "Kỳ thi cuối kỳ Ngữ văn",
      description: "Bài kiểm tra cuối kỳ môn Ngữ văn",
      start_date: "09:30 15-06-2025",
      end_date: "11:30 15-06-2025",
      create_date: "10:00 01-04-2025",
      code: "NGUVAN2025",
      password: "van456",
      type: "auto-generate",
      status: "Chưa mở"
    },
    {
      id: 3,
      teacher_id: 103,
      name: "Bài kiểm tra Vật lý",
      description: "Kiểm tra nhanh kiến thức môn Vật lý",
      start_date: "13:00 30-03-2025",
      end_date: "13:30 30-03-2025",
      create_date: "08:45 15-03-2025",
      code: "VATLY2025",
      password: "vatly789",
      type: "upload-file",
      status: "Đang mở"
    },
    {
      id: 4,
      teacher_id: 104,
      name: "Bài kiểm tra thực hành Sinh học",
      description: "Kiểm tra thực hành môn Sinh học",
      start_date: "14:00 05-05-2025",
      end_date: "15:00 05-05-2025",
      create_date: "12:00 25-03-2025",
      code: "SINH2025",
      password: "sinh321",
      type: "auto-generate",
      status: "Đã đóng"
    },
    {
      id: 5,
      teacher_id: 105,
      name: "Kỳ thi Lịch sử",
      description: "Bài kiểm tra tổng hợp môn Lịch sử",
      start_date: "10:00 01-07-2025",
      end_date: "12:00 01-07-2025",
      create_date: "09:00 10-04-2025",
      code: "LICHSU2025",
      password: "lichsu654",
      type: "upload-file",
      status: "Đã đóng"
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams = () => {
  };

  navigateExamSessionDashBoard() {
    this.router.navigate(['teacher/exam-session-dashboard']);
  }
}
