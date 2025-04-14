import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Exam} from '../../../core/models/exam.model';

@Component({
  selector: 'app-do-test',
  templateUrl: './do-test.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrl: './do-test.component.scss'
})
export class DoTestComponent implements OnInit {
  exam: Exam | null = null;
  subject = "Toán-GK";
  selectedQuestionIndex: number | null = null;
  answers: string[] = Array(this.exam?.totalQuestions).fill("");
  counter: number = 45 * 60; // 45 phút = 2700 giây

  constructor() {
    this.startCountdown();
  }

  ngOnInit() {
    const storedExam = localStorage.getItem('selectedExam');
    if (storedExam) {
      const exam = JSON.parse(storedExam);
      console.log("Exam lấy từ localStorage:", exam);
      this.exam = exam;
    }
    console.log(this.exam?.totalQuestions);
  }

  getAnswerJson(): { [key: number]: string } {
    const result: { [key: number]: string } = {};
    // @ts-ignore
    for (let i = 0; i < this.exam?.totalQuestions; i++) {
      result[i + 1] = this.answers[i] || ""; // nếu chưa chọn sẽ là ""
    }
    return result;
  }


  // Bắt đầu đếm ngược
  startCountdown() {
    setInterval(() => {
      if (this.counter > 0) {
        this.counter--;
      }
    }, 1000);
  }

  // Chọn câu hỏi
  selectQuestion(index: number) {
    this.selectedQuestionIndex = index;
  }

  // Cập nhật đáp án
  updateAnswer(answer: string) {
    if (this.selectedQuestionIndex !== null) {
      this.answers[this.selectedQuestionIndex] = answer;
    }
  }

  submit() {
    const resultJson = this.getAnswerJson(); // Gọi mỗi lần submit để lấy dữ liệu mới nhất
    console.log("Bài làm đã nộp:", resultJson);
  }

  // Định dạng thời gian (phút:giây)
  getFormattedTime(): string {
    const minutes = Math.floor(this.counter / 60);
    const seconds = this.counter % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
