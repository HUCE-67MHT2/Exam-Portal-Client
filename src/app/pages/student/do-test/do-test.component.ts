import { Component } from '@angular/core';
    import {NgForOf, NgIf} from '@angular/common';

    @Component({
      selector: 'app-do-test',
      templateUrl: './do-test.component.html',
      imports: [
        NgForOf,
        NgIf
      ],
      styleUrl: './do-test.component.scss'
    })
    export class DoTestComponent {
      subject = "Toán-GK";
      numQuestions = 30;
      selectedQuestionIndex: number | null = null;
      answers: string[] = Array(this.numQuestions).fill(""); // Mảng lưu đáp án
      counter: number = 45 * 60; // 45 phút = 2700 giây

      constructor() {
        this.startCountdown();
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
        console.log("Bài làm đã nộp:", this.answers);
      }

      // Định dạng thời gian (phút:giây)
      getFormattedTime(): string {
        const minutes = Math.floor(this.counter / 60);
        const seconds = this.counter % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    }
