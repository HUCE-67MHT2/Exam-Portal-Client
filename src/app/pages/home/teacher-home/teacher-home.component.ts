import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DatePipe, NgForOf, NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamSession } from '../../../core/models/exam-session.model';
import { ExamSessionService } from '../../../core/services/exam-session.service';
import { HeaderComponent } from '../../../layout/header/header.component';

@Component({
  selector: 'app-home-teacher',
  standalone: true,
  templateUrl: './teacher-home.component.html',
  imports: [
    HeaderComponent,
    NgForOf,
    NgClass,
    NgIf,
    DatePipe,
    FormsModule,
    NgOptimizedImage
  ],
  styleUrls: ['./teacher-home.component.scss'],
  providers: [DatePipe, ExamSessionService]
})
export class TeacherHomeComponent implements OnInit {
  examSessionList: ExamSession[] = [];
  filteredExams: ExamSession[] = [];
  searchTerm: string = '';
  currentFilter: string = 'all';

  constructor(private router: Router, private examSessionService: ExamSessionService) {}

  ngOnInit(): void {
    this.loadExamSession();
    localStorage.removeItem('exam_session_id');
  }

  loadExamSession = () => {
    this.examSessionService.getExamSession().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.examSessionList = response.body.examSessions;
          this.filteredExams = [...this.examSessionList];
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    });
  };

  navigateExamSessionDashBoard(exam_session_id: number, exam_session_name: string, exam_session_description: string) {
    this.router.navigate(['teacher/exam-session-dashboard'], {
      queryParams: {
        exam_session_id,
        exam_session_name,
        exam_session_description
      }
    });
    this.saveExamSessionId(exam_session_id);
  }

  saveExamSessionId(exam_session_id: number) {
    localStorage.setItem('exam_session_id', exam_session_id.toString());
  }

  navigateToCreateExam() {
    this.router.navigate(['/teacher/create-exam-session']);
  }

  filterExams() {
    // First filter by search term
    let result = this.examSessionList.filter(exam =>
      exam.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      exam.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      exam.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Then apply status filter
    if (this.currentFilter !== 'all') {
      result = result.filter(exam => this.getExamStatus(exam) === this.currentFilter);
    }

    this.filteredExams = result;
  }

  applyFilter(filter: string) {
    this.currentFilter = filter;
    this.filterExams();
  }

  getExamStatus(exam: ExamSession): string {
    const now = new Date();
    const startDate = new Date(exam.startDate);
    const endDate = new Date(exam.endDate);

    if (now < startDate) {
      return 'upcoming';
    } else if (now >= startDate && now <= endDate) {
      return 'active';
    } else {
      return 'completed';
    }
  }

  getStatusClassForExam(exam: ExamSession): string {
    const status = this.getExamStatus(exam);
    switch (status) {
      case 'active': return 'status-active';
      case 'upcoming': return 'status-upcoming';
      case 'completed': return 'status-completed';
      default: return 'status-draft';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Đang diễn ra';
      case 'upcoming': return 'Sắp diễn ra';
      case 'completed': return 'Đã kết thúc';
      default: return status;
    }
  }
}
