import {Component, OnInit} from '@angular/core';
    import {Router} from '@angular/router';
    import {Exam} from '../../../core/models/exam.model';
    import {GetExamsByTeacherService} from '../../../core/services/exam/get_exams_by_teacher/get_exams_by_teacher.service';
    import {CreateButtonComponent} from '../../../layout/button/create-button/create-button.component';
    import {SearchBarComponent} from '../../../layout/search-bar/search-bar.component';
    import {HeaderComponent} from '../../../layout/header/header.component';
    import {DatePipe, NgForOf} from '@angular/common';

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
      examList: Exam[] = [];

      constructor(private router: Router, private examService: GetExamsByTeacherService, private datePipe: DatePipe) {
      }

      ngOnInit(): void {
        this.loadExams();
      }

      loadExams = () => {
        this.examService.getExams().subscribe({
          next: (examData: Exam[]) => {
            this.examList = examData.map(exam => ({
              ...exam,
              examCreatedDate: this.datePipe.transform(exam.createDate, 'HH:mm dd-MM-yyyy') || ''
            }));
            console.log(this.examList);
          },
          error: (error) => {
            console.error('Error fetching exams:', error);
          }
        });
      };

      navigateToExamDetail(exam: Exam) {
        const route = exam.type === 'File' ? 'teacher/exam-created-with-file-detail' : 'teacher/exam-created-auto-detail';
        console.log(exam.type);
        this.router.navigate([route, exam.id]);
      }
    }
