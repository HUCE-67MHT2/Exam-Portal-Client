import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Exam} from '../../../core/models/exam.model';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import {ExamService} from '../../../core/services/exam.service';
import {Router} from '@angular/router';
import {StudentAnswerService} from '../../../core/services/student-answer.service';

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
    private examService: ExamService,
    private StudentAnswerService: StudentAnswerService,
  ) {
  }

  autoSaveTimeout: any = null;

  ngOnInit() {
    const storedExam = localStorage.getItem('selectedExam');
    if (storedExam) {
      this.exam = JSON.parse(storedExam);
      this.answers = Array(this.exam?.totalQuestions).fill("");
    }
    this.fileUrl = this.convertToPreviewUrl(this.exam?.fileUrl);
    console.log(this.exam?.totalQuestions);
    this.loadExamState()
  }

  //====================Logic cho testing========================
  endTime = new Date();

  loadExamState() {
    if (this.exam?.id) {
      this.examService.getTestState(this.exam.id).subscribe({
        next: response => {
          console.log("Trạng thái bài thi:", response);

          //lấy deadline bài thi
          this.endTime = this.parseDateTime(response.endTime);

          // Tính thời gian còn lại
          const now = new Date();
          const timeLeftInMs = this.endTime.getTime() - now.getTime();
          if (timeLeftInMs > 0) {
            this.counter = Math.floor(timeLeftInMs / 1000); // giây
            this.startCountdown();
          } else {
            this.counter = 0;
            this.confirmSubmit();
          }

          // Tạo mảng rỗng theo số lượng câu hỏi
          const total = this.exam?.totalQuestions || 0;
          this.answers = Array(total).fill("");

          // Đổ dữ liệu từ API vào answers
          for (const ans of response.answers) {
            const index = ans.questionNo - 1;
            if (index >= 0 && index < total) {
              this.answers[index] = ans.answerText;
            }
          }
        },
        error: (err) => {
          console.error("Lỗi chi tiết:", err);
          console.error("Thông báo lỗi:", err.error?.message); // đây là dòng quan trọng
        }
      });
    }
  }


  autoSaveAnswer=()=> {
    if (this.exam?.id) {
      const answerJson = this.getAnswerJson();
      this.StudentAnswerService.saveUploadStudentAnswers(this.exam.id, answerJson).subscribe({
        next: () => console.log("Tự động lưu câu trả lời thành công"),
        error: err => console.error("Lỗi khi lưu tự động:", err)
      });
    }
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

  private parseDateTime(dateTimeStr: string): Date {
    return new Date(dateTimeStr.replace(' ', 'T'));
  }

  // =====================Logic cho xem file========================

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

  updateAnswer(answer: string) {
    if (this.selectedQuestionIndex !== null) {
      if (this.answers[this.selectedQuestionIndex] === answer) {
        this.answers[this.selectedQuestionIndex] = "";
      } else {
        this.answers[this.selectedQuestionIndex] = answer;
      }

      // Reset auto-save timer
      if (this.autoSaveTimeout) {
        clearTimeout(this.autoSaveTimeout);
      }

      this.autoSaveTimeout = setTimeout(() => {
        this.autoSaveAnswer(); // Gọi API sau 15 giây nếu không thao tác nữa
      }, 5000);
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




}
