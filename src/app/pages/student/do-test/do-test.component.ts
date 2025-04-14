import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Exam} from '../../../core/models/exam.model';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-do-test',
  templateUrl: './do-test.component.html',
  imports: [
    NgForOf,
    NgIf,
    NgxDocViewerModule
  ],
  styleUrl: './do-test.component.scss'
})
export class DoTestComponent implements OnInit {
  exam: Exam | null = null;
  subject = "Toán-GK";
  selectedQuestionIndex: number | null = null;
  answers: string[] = [];
  counter: number = 45 * 60;
  fileUrl = "";
  showConfirmModal: boolean = false; // Trạng thái hiển thị modal

  @ViewChild('questionGrid') questionGrid!: ElementRef;
  @ViewChild('answerButtons') answerButtons!: ElementRef;
  constructor(
    private router: Router,
  ) {
    this.startCountdown();
  }

  ngOnInit() {
    const storedExam = localStorage.getItem('selectedExam');
    if (storedExam) {
      this.exam = JSON.parse(storedExam);
      this.answers = Array(this.exam?.totalQuestions).fill("");
    }
    this.fileUrl = this.convertToPreviewUrl(this.exam?.fileUrl);
    console.log(this.exam?.totalQuestions);
  }

  convertToPreviewUrl(url: string | null | undefined): string {
    if (!url) return '';
    const match = url.match(/\/d\/(.*?)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : '';
  }

  //===================Logic cho phiếu trả lời========================
  getAnswerJson(): { [key: number]: string } {
    const result: { [key: number]: string } = {};
    // @ts-ignore
    for (let i = 0; i < this.exam?.totalQuestions; i++) {
      result[i + 1] = this.answers[i] || ""; // nếu chưa chọn sẽ là ""
    }
    return result;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInGrid = this.questionGrid?.nativeElement.contains(event.target);
    const clickedInAnswers = this.answerButtons?.nativeElement?.contains(event.target);

    if (!clickedInGrid && !clickedInAnswers) {
      this.selectedQuestionIndex = null;
    }
  }

  // Chọn câu hỏi
  selectQuestion(index: number) {
    this.selectedQuestionIndex = index;
  }

  // Cập nhật đáp án
  updateAnswer(answer: string) {
    if (this.selectedQuestionIndex !== null) {
      if (this.answers[this.selectedQuestionIndex] === answer) {
        // Nếu người dùng click lại cùng một đáp án => bỏ chọn
        this.answers[this.selectedQuestionIndex] = "";
      } else {
        // Nếu chọn đáp án khác => cập nhật như bình thường
        this.answers[this.selectedQuestionIndex] = answer;
      }
    }
  }

  //====================Logic cho nộp bài thi========================

  // Mở modal xác nhận khi click vào nút Nộp bài
  submit() {
    this.showConfirmModal = true;
    const answerJson = this.getAnswerJson();
    console.log(answerJson);
  }

  // Hủy nộp bài, đóng modal
  cancelSubmit() {
    this.showConfirmModal = false;
  }

  // Xác nhận nộp bài
  confirmSubmit() {
    const resultJson = this.getAnswerJson();
    console.log("Bài làm đã nộp:", resultJson);
    // Có thể thêm logic lưu bài làm ở đây
    this.router.navigate(['student/exam-session-detail']);
  }

  // Đếm số câu hỏi chưa trả lời
  getUnansweredCount(): number {
    return this.answers.filter(answer => answer === "").length;
  }

  // Bắt đầu đếm ngược
  startCountdown() {
    setInterval(() => {
      if (this.counter > 0) {
        this.counter--;
      } else {
        // Tự động nộp bài khi hết thời gian
        this.confirmSubmit();
      }
    }, 1000);
  }

  // Định dạng thời gian (phút:giây)
  getFormattedTime(): string {
    const minutes = Math.floor(this.counter / 60);
    const seconds = this.counter % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
