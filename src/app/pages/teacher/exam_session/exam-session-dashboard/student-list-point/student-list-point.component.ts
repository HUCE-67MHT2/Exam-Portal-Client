import {Component, Input, OnInit} from '@angular/core';
import {SearchBarComponent} from "../../../../../layout/search-bar/search-bar.component";
import {ExamResultService} from '../../../../../core/services/exam-result.service'
import {StudentResultInfo} from '../../../../../core/models/student-result-info.model';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-student-list-point',
  imports: [SearchBarComponent, DatePipe, NgForOf],
  templateUrl: './student-list-point.component.html',
  styleUrl: './student-list-point.component.scss'
})
export class StudentListPointComponent implements OnInit {
  @Input() exam_session_id!: number;
  @Input() exam_name!: string;
  @Input() exam_description!: string;
  StudentResultInfo: StudentResultInfo[] = [];

  constructor(
    private examResultService: ExamResultService
  ) {
  }

  ngOnInit(): void {
    if (this.exam_session_id) {
      this.GetStudentResultInfo();
    } else {
      console.error('Hiện tại chưa có kết quả của sinh viên nào');
    }
  }

  GetStudentResultInfo = () => {
    this.examResultService.getExamResultById(this.exam_session_id).subscribe(
      (response) => {
        if (response.status === 200) {
          this.StudentResultInfo = response.body;
          console.log(this.StudentResultInfo);
        } else {
          console.error('Error fetching student result info:', response.status);
        }
      },
      (error) => {
        console.error('Error fetching student result info:', error);
      }
    );
  }
}
