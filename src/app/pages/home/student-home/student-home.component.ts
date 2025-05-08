import {Component, OnInit} from '@angular/core';
import {HeaderStudentComponent} from '../../../layout/header/header-student/header-student.component';
import {CommonModule} from '@angular/common';
import {ExamService} from '../../../core/services/exam.service';


@Component({
  selector: 'app-student-home',
  imports: [HeaderStudentComponent, CommonModule],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.scss'
})
export class StudentHomeComponent implements OnInit {
  todayExams: any[] = [];
  unfinishedExams: any[] = [];
  activeSection: string = 'schedule';
  achievementView: string = 'general'; // Default view

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.getTodayExams();
    this.getUnfinishedExams();
  }

  getTodayExams = () => {
    this.examService.getTodayExams().subscribe({
      next: (data) => {
        console.log("Today Exams: ", data);
        this.todayExams = data;
      },
      error: (error) => {
        console.error('Lỗi khi lấy lịch thi hôm nay:', error);
      }
    });
  }

  getUnfinishedExams = () => {
    this.examService.getUnfinishedExams().subscribe({
      next: (data: any[]) => {
        this.unfinishedExams = data;
      },
      error: (error) => {
        console.error('Lỗi khi lấy bài thi chưa làm:', error);
      }
    });
  }


  scrollToSection(elementId: string): void {
    this.activeSection = elementId;
    document.getElementById(elementId)?.scrollIntoView({behavior: 'smooth'});
  }



  switchAchievementView(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.achievementView = select.value;
  }
}
