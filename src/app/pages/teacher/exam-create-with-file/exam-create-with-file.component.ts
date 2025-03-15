import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as docx from 'docx-preview';
import {HttpClient} from '@angular/common/http';

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
  selectedFileUrl: SafeResourceUrl | null = null;
  @ViewChild('wordContainer') wordContainer!: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private sanitizer: DomSanitizer, private http: HttpClient) {
    this.examForm = this.fb.group({
      tenKyThi: ['', Validators.required],
      loaiKyThi: ['', Validators.required],
      maKyThi: ['', [Validators.required, Validators.minLength(5)]],
      matKhauKyThi: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.initializeAnswers();
  }

  private initializeAnswers() {
    this.answers = {};
    for (let i = 1; i <= this.totalQuestions; i++) {
      this.answers[i] = ''; // Default to empty or set a default value like 'A'
    }
  }

  uploadFile() {
    document.getElementById('fileInput')?.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Xóa đường dẫn PDF khi chọn file Word
    this.selectedFileUrl = null;

    if (file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      this.selectedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        const container = this.wordContainer.nativeElement;
        container.innerHTML = ''; // Xóa nội dung cũ

        // Đảm bảo container có kích thước phù hợp
        container.style.width = "100%";
        container.style.height = "600px";
        container.style.overflow = "auto";

        // @ts-ignore
        docx.renderAsync(arrayBuffer, container, null);
      };
      reader.readAsArrayBuffer(file);
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
      const formData = new FormData();

      // Thêm dữ liệu form
      Object.keys(this.examForm.value).forEach(key => {
        formData.append(key, this.examForm.value[key]);
      });

      // Thêm file đang được mở
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        formData.append('file', fileInput.files[0]);
      }

      // Thêm dữ liệu answers và tổng điểm
      formData.append('answers', JSON.stringify(this.answers));
      formData.append('totalScore', this.totalScore.toString());

      // Gửi yêu cầu POST đến backend
      this.http.post('URL_CUA_BACKEND', formData).subscribe(response => {
        console.log('Response từ backend:', response);
        alert('Exam created successfully!');
      }, error => {
        console.error('Lỗi khi gửi dữ liệu:', error);
        alert('Có lỗi xảy ra khi tạo kỳ thi.');
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  goBack() {
    this.router.navigate(['teacher/exam-create-type']);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
