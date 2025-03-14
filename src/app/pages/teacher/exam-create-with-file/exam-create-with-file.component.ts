import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-exam-create-with-file',
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './exam-create-with-file.component.html',
  styleUrl: './exam-create-with-file.component.scss'
})
export class ExamCreateWithFileComponent implements OnInit {
  activeTab: string = 'dapan'; // Default tab is "Đáp án"
  examForm: FormGroup; // Form data
  totalQuestions: number = 10;
  totalScore: number = 10;
  isQuickInputOpen: boolean = false;
  quickInputText: string = '';
  answerOptions: string[] = ['A', 'B', 'C', 'D'];
  answers: { [key: number]: string } = {}; // Store answers as {[1: "C"], [2: "B"]}
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.examForm = this.fb.group({
      tenKyThi: ['', Validators.required],
      loaiKyThi: ['', Validators.required],
      maKyThi: ['', [Validators.required, Validators.minLength(5)]],
      matKhauKyThi: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // Các hàm xử lý cho tab đáp án
  ngOnInit() {
    this.initializeAnswers();
  }

  private initializeAnswers() {
    this.answers = {};
    for (let i = 1; i <= this.totalQuestions; i++) {
      this.answers[i] = ''; // Default to empty or set a default value like 'A'
    }
  }

  getQuestions(): number[] {
    return Array.from({ length: this.totalQuestions }, (_, i) => i);
  }

  onTotalQuestionsChange() {
    const newAnswers: { [key: number]: string } = {};
    for (let i = 1; i <= this.totalQuestions; i++) {
      newAnswers[i] = this.answers[i] || ''; // Retain old answers if available
    }
    this.answers = newAnswers;
  }

  getQuestionScore() {
    return (this.totalQuestions > 0 ? this.totalScore / this.totalQuestions : 0).toFixed(2);
  }

  openQuickInput() {
    this.isQuickInputOpen = true;
  }

  processQuickInput() {
    this.errorMessage = '';
    // Chuyển chuỗi thành chữ hoa và loại bỏ khoảng trắng
    const input = this.quickInputText.toUpperCase().trim();

    // Kiểm tra nếu chuỗi chứa ký tự không hợp lệ (không phải A, B, C, D)
    if (!/^[ABCD]+$/.test(input)) {
      this.errorMessage = "Chuỗi nhập vào chỉ được chứa các ký tự hoa thường A, B, C, D!";
      return;
    }

    // Chuyển chuỗi thành object theo định dạng {1: 'A', 2: 'B', ...}
    const newQuickAnswer: { [key: number]: string } = {};
    for (let i = 0; i < input.length; i++) {
      newQuickAnswer[i + 1] = input[i];
    }

    // Cập nhật `answers`
    this.answers = newQuickAnswer;
    console.log("Cập nhật đáp án:", this.answers);

    // Đóng modal
    this.isQuickInputOpen = false;
  }


  onSubmit() {
    if (this.examForm.valid) {
      console.log('Form data:', this.examForm.value);
      alert('Exam created successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  }

  goBack() {
    this.router.navigate(['teacher/exam-create-type']);
  }

  discard() {
    // Add discard logic here
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
