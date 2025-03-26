import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CreateButtonComponent} from '../../../layout/button/create-button/create-button.component';
import {SearchBarComponent} from '../../../layout/search-bar/search-bar.component';
import {HeaderComponent} from '../../../layout/header/header.component';
import {DatePipe, NgForOf} from '@angular/common';
import {ExamSession} from '../../../core/models/examSession.model';
import {ExamSessionService} from '../../../core/services/exam/exam_session/exam-session.service';

@Component({
  selector: 'app-home-teacher',
  standalone: true,
  templateUrl: './teacher-home.component.html',
  imports: [
    CreateButtonComponent,
    SearchBarComponent,
    HeaderComponent,
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./teacher-home.component.scss'],
  providers: [DatePipe, ExamSessionService]
})
export class TeacherHomeComponent implements OnInit {
  examSessionList: ExamSession[] = [];

  constructor(private router: Router, private examSessionService: ExamSessionService) {
  }

  loadExamSession = () => {
    this.examSessionService.getExamSession().subscribe({
      next: (response) => {
        console.log('Phản hồi từ server:', response.body);
        if (response.status === 200) {
          this.examSessionList = response.body.examSessions;
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);

      }
    });

  };

  ngOnInit(): void {
    this.loadExamSession();

  }

  navigateExamSessionDashBoard(id: number) {
    this.router.navigate(['teacher/exam-session-dashboard'], {queryParams: {id}});
  }
}
