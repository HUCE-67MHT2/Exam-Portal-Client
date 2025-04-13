import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamSession } from '../../../core/models/examSession.model';
import { ExamSessionEnrollmentService } from '../../../core/services/exam-session-enrollments/exam-session-enrollment.service';
import { ToastrService } from 'ngx-toastr';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HeaderStudentComponent} from '../../../layout/header/header-student/header-student.component';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    HeaderStudentComponent,
    NgIf,
    // Các imports khác của bạn
  ],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  // Các biến của component
  searchCode: string = '';
  searchTerm: string = '';
  message: string = '';
  isModalOpen: boolean = false;
  foundExam: ExamSession | null = null;
  ExamSession: ExamSession[] = [];
  filteredExams: ExamSession[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private examSessionEnrollmentService: ExamSessionEnrollmentService
  ) {}

  ngOnInit() {
    this.loadExamSessions();
  }

  loadExamSessions() {
    this.examSessionEnrollmentService.getExamSessionEnrollmentsByStudentToken().subscribe({
      next: (response) => {
        this.ExamSession = response.body;
        this.filteredExams = this.ExamSession;
        console.log('Exam sessions loaded:', this.ExamSession);
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách kỳ thi:', err);
      }
    });
  }

  filterExams() {
    const keyword = this.searchTerm.trim().toLowerCase();
    if (!keyword) {
      this.filteredExams = this.ExamSession; // không nhập gì -> show tất cả
      return;
    }
    this.filteredExams = this.ExamSession.filter(exam =>
      exam.name?.toLowerCase().includes(keyword) ||
      exam.description?.toLowerCase().includes(keyword) ||
      exam.code?.toLowerCase().includes(keyword)
    );
  }

  openModal() {
    this.isModalOpen = true;
    this.searchTerm = ''; // reset input mỗi lần mở
    this.foundExam = null;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  searchByCode() {
    if (this.searchCode.trim()) {
      this.examSessionEnrollmentService.joinExamSession(this.searchCode.trim()).subscribe({
        next: (response) => {
          if (response.body) {
            this.toastr.success("Tham gia kỳ thi thành công", "Thành công", {
              timeOut: 2000,
            });
            this.closeModal();
            this.loadExamSessions();
          } else {
            this.message = "Không tìm thấy kỳ thi, vui lòng kiểm tra lại !";
          }
        },
        error: (err) => {
          console.error('Error searching exam by code:', err);
          this.message = err.error.message;
        }
      });
    }
  }

  // Phương thức để xác định trạng thái của kỳ thi
  getStatus(startDate: Date, endDate: Date): string {
    const now = new Date();

    // Nếu startDate và endDate là chuỗi thì cần chuyển đổi:
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return 'Sắp mở';
    } else if (now >= start && now <= end) {
      return 'Đang mở';
    } else {
      return 'Đã đóng';
    }
  }

}
