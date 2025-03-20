import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exam } from '../../../core/models/exam.model';
import { GetExamsByTeacherService } from '../../../core/services/exam/get_exams_by_teacher/get_exams_by_teacher.service';
import { CreateButtonComponent } from '../../../layout/button/create-button/create-button.component';
import { SearchBarComponent } from '../../../layout/search-bar/search-bar.component';
import { HeaderComponent } from '../../../layout/header/header.component';
import { NgForOf, DatePipe } from '@angular/common';

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
  exams: Exam[] = [];

  constructor(private router: Router, private examService: GetExamsByTeacherService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.fetchExams();
  }

  fetchExams = () => {
    this.examService.getExams().subscribe({
      next: (data: Exam[]) => {
        this.exams = data.map(exam => ({
          ...exam,
          examCreatedDate: this.datePipe.transform(exam.examCreatedDate, 'HH:mm dd-MM-yyyy') || ''
        }));
        console.log(this.exams);
      },
      error: (error) => {
        console.error('Error fetching exams:', error);
        alert('Không thể lấy danh sách kỳ thi. Vui lòng thử lại sau.');
      }
    });
  };

  navigateToExamDetail(exam: Exam) {
    const route = exam.examSourceType === 'File' ? 'teacher/exam-created-with-file-detail' : 'teacher/exam-created-auto-detail';
    console.log(exam.examType)
    this.router.navigate([route, exam.examId], {
      queryParams: {
        status: exam.examStatus,
        name: exam.examName,
        password: exam.examPassword,
        type: exam.examType
      }
    });
  }
}
