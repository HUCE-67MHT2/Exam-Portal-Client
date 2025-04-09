import {Component, Input, OnInit} from '@angular/core';
import {Exam} from '../../../../../core/models/exam.model';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamService} from '../../../../../core/services/exam/exam.service';

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
  examList: Exam[] = [];
  filteredExams: Exam[] = [];
  searchTerm: string = '';
  @Input() exam_session_id!: number;

  constructor(
    private router: Router,
    private examService: ExamService,
    private route: ActivatedRoute,
  ) {
  }

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
        if (response.status === 200) {
          this.examList = response.body.exams;
        }
        this.filteredExams = [...this.examList];

        // Kiểm tra dữ liệu đã lấy về
        console.log("Exam List:", this.examList);
        console.log("Filtered Exam List:", this.filteredExams);
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
      const normalizedExamDescription = this.removeVietnameseTones(exam.description.toLowerCase());
      return normalizedExamName.includes(normalizedSearchTerm) || normalizedExamDescription.includes(normalizedSearchTerm);
    });
  }


  removeVietnameseTones(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  navigateToCreatExam() {
    this.router.navigate(['/teacher/exam-create-type'], {queryParams: {id: this.exam_session_id}});
    console.log(this.exam_session_id);
  }

  editExam(exam_id: number, exam_session_id: number) {
    this.router.navigate(['/teacher/edit-exam-with-file'], {
      queryParams: {
        exam_id: exam_id,
        exam_session_id: exam_session_id
      }
    });
  }
}
