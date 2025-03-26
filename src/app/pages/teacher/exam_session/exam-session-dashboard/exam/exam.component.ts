import { Component, Input, OnInit } from '@angular/core';
import { Exam } from '../../../../../core/models/exam.model';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import { GetExamsBySessionIDService} from '../../../../../core/services/exam/get_exams_by_exam_session_id/get_exams_by_exam_session_id.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgOptimizedImage,
    DatePipe
  ],
  styleUrl: './exam.component.scss'
})
export class ExamComponent implements OnInit {
  constructor(
    private router: Router,
    private examService: GetExamsBySessionIDService,
    private route: ActivatedRoute,
  ) {}

  examList: Exam[] = [];
  filteredExams: Exam[] = [];
  searchTerm: string = '';
  @Input() exam_session_id!: number;

  ngOnInit(): void {
    console.log(this.exam_session_id);
    this.route.queryParams.subscribe(params => {
      this.exam_session_id = params['id'];
    });
    this.getExams();
  }

  getExams = () => {
    this.examService.getExams(this.exam_session_id).subscribe({
      next: (response) => {
        console.log(response);
        if(response.status === 200) {
          this.examList = response.body.exams;
        }
        this.filteredExams = [...this.examList];
        console.log("Fetched Exam List:", this.examList);
      },
      error: (error) => {
        console.error("Error fetching exams:", error);
      }
    });
  }

  filterExam() {
    const normalizedSearchTerm = this.removeVietnameseTones(this.searchTerm.toLowerCase());
    this.filteredExams = this.examList.filter(exam => {
      const normalizedExamName = this.removeVietnameseTones(exam.name.toLowerCase());
      return normalizedExamName.includes(normalizedSearchTerm);
    });
  }

  removeVietnameseTones(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  navigateToCreatExam() {
    this.router.navigate(['/teacher/exam-create-type'], { queryParams: { id: this.exam_session_id } });
    console.log(this.exam_session_id);
  }
}
