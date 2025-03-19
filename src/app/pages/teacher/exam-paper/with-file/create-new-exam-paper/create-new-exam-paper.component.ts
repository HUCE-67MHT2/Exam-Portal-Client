import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import * as docx from 'docx-preview';

@Component({
  selector: 'app-edit-exam-paper',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './create-new-exam-paper.component.html',
  styleUrl: './create-new-exam-paper.component.scss'
})
export class CreateNewExamPaperComponent implements OnInit {
  activeTab: string = 'dapan'; // Default tab is "Đáp án"
  examForm: FormGroup; // Form data
  totalQuestions: number = 10;
  totalScore: number = 10;
  isQuickInputOpen: boolean = false;
  quickInputText: string = '';
  answerOptions: string[] = ['A', 'B', 'C', 'D'];
  answers: { [key: number]: string } = {};
  errorMessage: string = '';
  selectedFileUrl: SafeResourceUrl | null = null;

  @ViewChild('wordContainer') wordContainer!: ElementRef;
  private examName: any;
  private examType: any;
  private examPassword: any;
  private examCode: any;

  constructor(private fb: FormBuilder, private router: Router, private sanitizer: DomSanitizer, private http: HttpClient, private route: ActivatedRoute) {
    this.examForm = this.fb.group({
      examPaperId: ['', [Validators.required, Validators.minLength(5)]],
      examPaperDuration: ['', Validators.required],
      examPaperDateCreated: ['', Validators.required],
      examPaperStatus: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params['name']) {
        this.examName = params['name'];
      }
      if (params['type']) {
        this.examType = params['type'];
      }
      if (params['examCode']) {
        this.examCode = params['examCode'];
      }
      if (params['password']) {
        this.examPassword = params['password'];
      }
    });
    this.initializeAnswers();
  }

  uploadFile() {
    document.getElementById('fileInput')?.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

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
  }

  getQuestions(): number[] {
    return Array.from({length: this.totalQuestions}, (_, i) => i);
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

  goBack() {
    this.router.navigate(['teacher/exam-created-with-file-detail', this.examCode], {
      queryParams: {
        name: this.examName,
        type: this.examType,
        password: this.examPassword
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onSubmit() {

  }

  private initializeAnswers() {
    this.answers = {};
    for (let i = 1; i <= this.totalQuestions; i++) {
      this.answers[i] = ''; // Default to empty or set a default value like 'A'
    }
  }
}
