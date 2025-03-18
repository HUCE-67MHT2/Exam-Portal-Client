import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as docx from 'docx-preview';
import {HttpClient} from '@angular/common/http';
import {CreateExamWithFileService} from '../../../../../core/services/exam/create_exam_with_file/create-exam-with-file.service';
import {ToastrService} from 'ngx-toastr';
import {LoadingComponent} from '../../../../../layout/loading/loading.component';

@Component({
  selector: 'app-exam-create-with-file',
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    LoadingComponent
  ],
  templateUrl: './exam-create-with-file.component.html',
  styleUrl: './exam-create-with-file.component.scss',
  providers: [CreateExamWithFileService]
})
export class ExamCreateWithFileComponent implements OnInit {
  activeTab: string = 'dapan'; // Default tab is "Đáp án"
  examForm: FormGroup; // Form data
  totalQuestions: number = 5;
  totalScore: number = 5;
  isQuickInputOpen: boolean = false;
  quickInputText: string = '';
  answerOptions: string[] = ['A', 'B', 'C', 'D'];
  answers: { [key: number]: string } = {};
  errorMessage: string = '';
  fileRequest : any;
  selectedFileUrl: SafeResourceUrl | null = null;
  loading: boolean = false;
  @ViewChild('wordContainer') wordContainer!: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private sanitizer: DomSanitizer, private http: HttpClient
              , private createExamWithFileService: CreateExamWithFileService, private toastr: ToastrService) {
    this.examForm = this.fb.group({
      tenKyThi: ['', Validators.required],
      loaiKyThi: ['', Validators.required],
      maDeThi: ['', [Validators.required, Validators.minLength(5)]],
      thoiGianLamBai: ['', Validators.required],
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
        container.style.overflow = "auto";

        // @ts-ignore
        docx.renderAsync(arrayBuffer, container, null);
      };
      reader.readAsArrayBuffer(file);
    }
    this.fileRequest = file;

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
    console.log(this.answers);
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

  onSubmit = () => {
    // Check if all questions have been answered
    const allQuestionsAnswered = Object.values(this.answers).every(answer => answer !== '');
    if (!allQuestionsAnswered) {
      alert('Please answer all questions before submitting.');
      return;
    }

    if (this.examForm.valid) {
      this.loading = true;
      const formData = new FormData();

      // Add form data
      Object.keys(this.examForm.value).forEach(key => {
        formData.append(key, this.examForm.value[key]);
      });

      // Add the selected file
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        formData.append('file', fileInput.files[0]);
      }

      const formattedAnswers = Object.entries(this.answers).map(([id, select]) => ({
        id,
        select
      }));

      formData.append('answers', JSON.stringify(formattedAnswers));
      formData.append('totalScore', this.totalScore.toString());

      // Log FormData entries
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const formObject: any = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      console.log(formObject.tenKyThi,
        formObject.loaiKyThi, formObject.maDeThi, formObject.thoiGianLamBai, formObject.maKyThi,
        formObject.matKhauKyThi, JSON.stringify(formattedAnswers), formObject.file);

      // Send POST request to backend
      this.createExamWithFileService.addExamWithFile(formObject.tenKyThi,
        formObject.loaiKyThi, formObject.maDeThi, formObject.thoiGianLamBai, formObject.maKyThi,
        formObject.matKhauKyThi, JSON.stringify(formattedAnswers), formObject.file).subscribe({
        next: (response) => {
          this.loading = false;
          console.log('Phản hồi từ server:', response);
          if (response.status === 200) {
            this.toastr.success('Tạo kì thi mới thành công', 'Thành công', { timeOut: 2000 });
            setTimeout(() => {
              this.router.navigate(['/home/teacher']);
            }, 2000);
          }
        },
        error: (error) => {
          this.loading = false;
          console.error('Lỗi khi tạo kỳ thi:', error);
          this.toastr.error(error.error.message, 'Lỗi', { timeOut: 2000 });
        }
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
