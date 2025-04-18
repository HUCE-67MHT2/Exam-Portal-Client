import {Component, OnDestroy, OnInit} from '@angular/core';
import { Exam, ExamData, StudentAnswer,} from '../../../core/models/exam.model';
import { NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-do-test-autogen',
  imports: [
    NgForOf,
    NgIf,
  ],
  templateUrl: './do-test-autogen.component.html',
  styleUrl: './do-test-autogen.component.scss'
})

export class DoTestAutogenComponent implements OnInit, OnDestroy {


  // State variables
  examData: ExamData = {
    exam_id: 456,
    questions: [
      {
        question_id: 12323,
        question_text: "Thủ đô của Việt Nam là?",
        question_answers: [
          { answer_id: 1, answer_text: "Hà Nội" },
          { answer_id: 2, answer_text: "Hồ Chí Minh" },
          { answer_id: 3, answer_text: "Đà Nẵng" },
          { answer_id: 4, answer_text: "Hải Phòng" }
        ]
      },
      {
        question_id: 23442,
        question_text: "Ngôn ngữ lập trình nào không phải là ngôn ngữ hướng đối tượng?",
        question_answers: [
          { answer_id: 1, answer_text: "Java" },
          { answer_id: 2, answer_text: "C++" },
          { answer_id: 3, answer_text: "C" },
          { answer_id: 4, answer_text: "Python" }
        ]
      },
      {
        question_id: 5453,
        question_text: "Angular được phát triển bởi công ty nào?",
        question_answers: [
          { answer_id: 1, answer_text: "Facebook" },
          { answer_id: 2, answer_text: "Google" },
          { answer_id: 3, answer_text: "Microsoft" },
          { answer_id: 4, answer_text: "Amazon" }
        ]
      },
      {
        question_id: 434342,
        question_text: "Trong JavaScript, để khai báo một biến không thay đổi giá trị, ta sử dụng từ khóa nào?, Trong JavaScript, để khai báo một biến không thay đổi giá trị, ta sử dụng từ khóa nào, Trong JavaScript, để khai báo một biến không thay đổi giá trị, ta sử dụng từ khóa nào",
        question_answers: [
          { answer_id: 1, answer_text: "varTrong JavaScript, để khai báo một biến không thay đổi giá trị, ta sử dụng từ khóa nàoTrong JavaScript, để khai báo một biến không thay đổi giá trị, ta sử dụng từ khóa nàoTrong JavaScript, để khai báo một biến không thay đổi giá trị, ta sử dụng từ khóa nào" },
          { answer_id: 2, answer_text: "let" },
          { answer_id: 3, answer_text: "const" },
          { answer_id: 4, answer_text: "static" }
        ]
      },
      {
        question_id: 53453,
        question_text: "Trong CSS, thuộc tính nào dùng để thiết lập khoảng cách giữa các phần tử?",
        question_answers: [
          { answer_id: 1, answer_text: "margin" },
          { answer_id: 2, answer_text: "padding" },
          { answer_id: 3, answer_text: "spacing" },
          { answer_id: 4, answer_text: "gap" }
        ]
      },
      {
        question_id: 665465,
        question_text: "HTTP status code nào đại diện cho lỗi 'Không tìm thấy'?",
        question_answers: [
          { answer_id: 1, answer_text: "200" },
          { answer_id: 2, answer_text: "404" },
          { answer_id: 3, answer_text: "500" },
          { answer_id: 4, answer_text: "403" }
        ]
      },
      {
        question_id: 7345345,
        question_text: "Trong Angular, decorator nào được sử dụng để định nghĩa một component?",
        question_answers: [
          { answer_id: 1, answer_text: "@Component" },
          { answer_id: 2, answer_text: "@NgModule" },
          { answer_id: 3, answer_text: "@Injectable" },
          { answer_id: 4, answer_text: "@Directive" }
        ]
      },
      {
        question_id: 834534,
        question_text: "Phương thức HTTP nào dùng để cập nhật một phần của tài nguyên?",
        question_answers: [
          { answer_id: 1, answer_text: "GET" },
          { answer_id: 2, answer_text: "POST" },
          { answer_id: 3, answer_text: "PUT" },
          { answer_id: 4, answer_text: "PATCH" }
        ]
      },
      {
        question_id: 934534,
        question_text: "Thuật ngữ 'SPA' trong phát triển web là viết tắt của?",
        question_answers: [
          { answer_id: 1, answer_text: "Simple Page Application" },
          { answer_id: 2, answer_text: "Single Page Application" },
          { answer_id: 3, answer_text: "System Page Application" },
          { answer_id: 4, answer_text: "Standard Page Application" }
        ]
      },
      {
        question_id: 130345,
        question_text: "Hàm JavaScript nào dùng để chuyển đổi một chuỗi JSON thành đối tượng JavaScript?",
        question_answers: [
          { answer_id: 1, answer_text: "JSON.parse()" },
          { answer_id: 2, answer_text: "JSON.stringify()" },
          { answer_id: 3, answer_text: "JSON.convert()" },
          { answer_id: 4, answer_text: "JSON.toObject()" }
        ]
      },
      {
        question_id: 34561,
        question_text: "Thủ đô của Việt Nam là?",
        question_answers: [
          { answer_id: 1, answer_text: "Hà Nội" },
          { answer_id: 2, answer_text: "Hồ Chí Minh" },
          { answer_id: 3, answer_text: "Đà Nẵng" },
          { answer_id: 4, answer_text: "Hải Phòng" }
        ]
      },
      {
        question_id: 257562,
        question_text: "Ngôn ngữ lập trình nào không phải là ngôn ngữ hướng đối tượng?",
        question_answers: [
          { answer_id: 1, answer_text: "Java" },
          { answer_id: 2, answer_text: "C++" },
          { answer_id: 3, answer_text: "C" },
          { answer_id: 4, answer_text: "Python" }
        ]
      },
      {
        question_id: 36725,
        question_text: "Angular được phát triển bởi công ty nào?",
        question_answers: [
          { answer_id: 1, answer_text: "Facebook" },
          { answer_id: 2, answer_text: "Google" },
          { answer_id: 3, answer_text: "Microsoft" },
          { answer_id: 4, answer_text: "Amazon" }
        ]
      },
      {
        question_id: 256454,
        question_text: "Trong JavaScript, để khai báo một biến không thay đổi giá trị, ta sử dụng từ khóa nào?, Trong JavaScript, để khai báo một biến không thay đổi giá trị, ta sử dụng từ khóa nào, Trong JavaScript, để khai báo một biến không thay đổi giá trị, ta sử dụng từ khóa nào",
        question_answers: [
          { answer_id: 1, answer_text: "varTrong JavaScript, để khai báo một biến không thay đổi giá trị, ta sử dụng từ khóa nàoTrong JavaScript, để khai báo một biến không thay đổi giá trị, ta sử dụng từ khóa nàoTrong JavaScript, để khai báo một biến không thay đổi giá trị, ta sử dụng từ khóa nào" },
          { answer_id: 2, answer_text: "let" },
          { answer_id: 3, answer_text: "const" },
          { answer_id: 4, answer_text: "static" }
        ]
      },
      {
        question_id: 54625,
        question_text: "Trong CSS, thuộc tính nào dùng để thiết lập khoảng cách giữa các phần tử?",
        question_answers: [
          { answer_id: 1, answer_text: "margin" },
          { answer_id: 2, answer_text: "padding" },
          { answer_id: 3, answer_text: "spacing" },
          { answer_id: 4, answer_text: "gap" }
        ]
      },
      {
        question_id: 5245426,
        question_text: "HTTP status code nào đại diện cho lỗi 'Không tìm thấy'?",
        question_answers: [
          { answer_id: 1, answer_text: "200" },
          { answer_id: 2, answer_text: "404" },
          { answer_id: 3, answer_text: "500" },
          { answer_id: 4, answer_text: "403" }
        ]
      },
      {
        question_id: 76877,
        question_text: "Trong Angular, decorator nào được sử dụng để định nghĩa một component?",
        question_answers: [
          { answer_id: 1, answer_text: "@Component" },
          { answer_id: 2, answer_text: "@NgModule" },
          { answer_id: 3, answer_text: "@Injectable" },
          { answer_id: 4, answer_text: "@Directive" }
        ]
      },
      {
        question_id: 453258,
        question_text: "Phương thức HTTP nào dùng để cập nhật một phần của tài nguyên?",
        question_answers: [
          { answer_id: 1, answer_text: "GET" },
          { answer_id: 2, answer_text: "POST" },
          { answer_id: 3, answer_text: "PUT" },
          { answer_id: 4, answer_text: "PATCH" }
        ]
      },
      {
        question_id: 2134329,
        question_text: "Thuật ngữ 'SPA' trong phát triển web là viết tắt của?",
        question_answers: [
          { answer_id: 1, answer_text: "Simple Page Application" },
          { answer_id: 2, answer_text: "Single Page Application" },
          { answer_id: 3, answer_text: "System Page Application" },
          { answer_id: 4, answer_text: "Standard Page Application" }
        ]
      },
      {
        question_id: 10213423,
        question_text: "Hàm JavaScript nào dùng để chuyển đổi một chuỗi JSON thành đối tượng JavaScript?",
        question_answers: [
          { answer_id: 1, answer_text: "JSON.parse()" },
          { answer_id: 2, answer_text: "JSON.stringify()" },
          { answer_id: 3, answer_text: "JSON.convert()" },
          { answer_id: 4, answer_text: "JSON.toObject()" }
        ]
      }
    ]
  };

  studentAnswers: StudentAnswer[] = [];
  remainingTimeInSeconds: number = 0;
  timerInterval: any;
  examSubmitted: boolean = false;
  currentExamViewIndex: number = 0;
  isExamOverviewVisible: boolean = false;


  localExamData: Exam | null = null;

  constructor() {}


  totalTimeInMinutes: number = 60;
  ngOnInit(): void {
    // Load exam data from localStorage
    const storedExam = localStorage.getItem('selectedExam');
    if (storedExam) {
      const examData = JSON.parse(storedExam);
      this.localExamData = JSON.parse(storedExam);
      // Update exam details from localStorage
      this.totalTimeInMinutes = examData.duration;


      // Log the loaded data
      console.log('Loaded exam data from localStorage:', examData);
    } else {
      console.warn('No exam data found in localStorage');
    }

    this.initializeExam();
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  // INITIALIZATION GROUP
  initializeExam(): void {
    // Initialize student answers with null (not answered)
    this.studentAnswers = this.examData.questions.map(question => ({
      question_id: question.question_id,
      selected_answer_id: null
    }));

    // Set timer
    this.remainingTimeInSeconds = this.totalTimeInMinutes * 60;
  }

  // TIMER HANDLING GROUP
  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.remainingTimeInSeconds--;
      if (this.remainingTimeInSeconds <= 0) {
        this.handleTimeUp();
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  handleTimeUp(): void {
    this.stopTimer();
    this.submitExam();
  }

  // Format time for display as MM:SS
  formatTime(): string {
    const minutes = Math.floor(this.remainingTimeInSeconds / 60);
    const seconds = this.remainingTimeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // ANSWER HANDLING GROUP
  selectAnswer(questionId: number, answerId: number): void {
    if (this.examSubmitted) return;

    const answerIndex = this.studentAnswers.findIndex(a => a.question_id === questionId);
    if (answerIndex !== -1) {
      // Nếu người dùng nhấp vào đáp án đã chọn, bỏ chọn nó
      if (this.studentAnswers[answerIndex].selected_answer_id === answerId) {
        this.studentAnswers[answerIndex].selected_answer_id = null;
      } else {
        // Nếu không, chọn đáp án mới
        this.studentAnswers[answerIndex].selected_answer_id = answerId;
      }
    }
  }

  isAnswerSelected(questionId: number, answerId: number): boolean {
    const answer = this.studentAnswers.find(a => a.question_id === questionId);
    return answer?.selected_answer_id === answerId;
  }

  getQuestionStatus(questionId: number): 'answered' | 'unanswered' {
    const answer = this.studentAnswers.find(a => a.question_id === questionId);
    return answer?.selected_answer_id !== null ? 'answered' : 'unanswered';
  }

  getAnsweredCount(): number {
    return this.studentAnswers.filter(a => a.selected_answer_id !== null).length;
  }

  getUnansweredCount(): number {
    return this.studentAnswers.filter(a => a.selected_answer_id === null).length;
  }

  getCompletedPercentage(): number {
    return (this.getAnsweredCount() / this.examData.questions.length) * 100;
  }

  // EXAM SUBMISSION GROUP
  submitExam(): void {
    if (this.examSubmitted) return;

    this.stopTimer();
    this.examSubmitted = true;

    // Format data according to required backend structure
    const submission = {
      exam_id: this.examData.exam_id,
      answers: [...this.studentAnswers]
    };

    // Log the formatted submission for verification
    console.log('Submitting exam in required format:');
    console.log(JSON.stringify(submission, null, 2));

    // Detailed log showing question texts and selected answers
    console.log('===== DETAILED SUBMISSION DATA =====');
    console.log(`Exam ID: ${this.examData.exam_id}`);
    console.log(`Questions answered: ${this.getAnsweredCount()} / ${this.examData.questions.length}`);
    console.log(`Time used: ${this.totalTimeInMinutes * 60 - this.remainingTimeInSeconds} seconds`);

    // Here you would send the data to your backend API
    // this.examService.submitExam(submission).subscribe(...);

  }

  confirmSubmit(): void {
    const unansweredCount = this.getUnansweredCount();

    if (unansweredCount > 0) {
      const confirmed = confirm(`Bạn còn ${unansweredCount} câu hỏi chưa trả lời. Bạn có chắc chắn muốn nộp bài?`);
      if (confirmed) {
        this.submitExam();
      }
    } else {
      this.submitExam();
    }
  }

  // NAVIGATION GROUP
  scrollToQuestion(index: number): void {
    const element = document.getElementById(`question-item-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

      // Optional: add a highlight effect to the question that was just scrolled to
      element.classList.add('highlight-question');
      setTimeout(() => {
        element.classList.remove('highlight-question');
      }, 1500);
    }
  }

  // EXAM OVERVIEW GROUP
  toggleExamOverview(): void {
    this.isExamOverviewVisible = !this.isExamOverviewVisible;
  }

  getLetterFromAnswerId(answerId: number): string {
    // Convert answer ID to letter: 1->A, 2->B, 3->C, 4->D
    return String.fromCharCode(64 + answerId);
  }

}
