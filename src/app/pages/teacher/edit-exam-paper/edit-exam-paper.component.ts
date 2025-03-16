import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import * as docx from 'docx-preview';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-exam-paper',
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './edit-exam-paper.component.html',
  styleUrl: './edit-exam-paper.component.scss'
})
export class EditExamPaperComponent implements OnInit {
  activeTab: string = 'dapan'; // Default tab is "Đáp án"
  examForm: FormGroup; // Form data
  totalQuestions: number = 10;
  totalScore: number = 10;
  isQuickInputOpen: boolean = false;
  quickInputText: string = '';
  answerOptions: string[] = ['A', 'B', 'C', 'D'];
  answers: { [key: number]: string } = {1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'A', 6: 'B', 7: 'C', 8: 'D', 9: 'A', 10: 'B'};
  errorMessage: string = '';
  selectedFileUrl: SafeResourceUrl | null = null;
  docUrl: SafeResourceUrl;
  showDocUrl: boolean = true;

  @ViewChild('wordContainer') wordContainer!: ElementRef;
  examPaperId: string = 'ma khong xac dinh';
  examPaperDuration: string = 'thoi gian khong xac dinh';
  examPaperDateCreated: string = 'thoi gian tao khong xac dinh';
  examPaperStatus: string = 'trang thai khong xac dinh';
  private examName: any;
  private examType: any;
  private examPassword: any;
  private examCode: any;
  constructor(private fb: FormBuilder, private router: Router, private sanitizer: DomSanitizer, private http: HttpClient,private route: ActivatedRoute) {
    this.examForm = this.fb.group({
      examPaperId: [this.examPaperId, [Validators.required, Validators.minLength(5)]],
      examPaperDuration: [this.examPaperDuration, Validators.required],
      examPaperDateCreated: [this.examPaperDateCreated, Validators.required],
      examPaperStatus: [this.examPaperStatus, Validators.required]
    });
    const googleDocUrl = "https://docs.google.com/document/d/1U0F2mKifiX-c4m2TmkmOyCDnlZrjSYANZjqD611z6Rw/preview";
    this.docUrl = this.sanitizer.bypassSecurityTrustResourceUrl(googleDocUrl);
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.examPaperId = param;
    }
    this.route.queryParams.subscribe((params: any) => {
      if (params['duration']) {
        this.examPaperDuration = params['duration'].match(/\d+/)?.[0] || ''; // Lấy phần số
      }
      if (params['dateCreated']) {
        this.examPaperDateCreated = new Date(params['dateCreated']).toISOString().split('T')[0]; // Convert to date string
      }
      if (params['status']) {
        this.examPaperStatus = params['status'].trim(); // Xóa khoảng trắng thừa
      }
      // Nhận thêm 4 tham số mới
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

      // Set default values for the form controls
      this.examForm.patchValue({
        examPaperId: this.examPaperId,
        examPaperDuration: this.examPaperDuration,
        examPaperDateCreated: this.examPaperDateCreated,
        examPaperStatus: this.examPaperStatus
      });
    });
  }

  uploadFile() {
    document.getElementById('fileInput')?.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Hide Google Docs iframe when a file is selected
    this.showDocUrl = false;

    if (file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      this.selectedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        const container = this.wordContainer.nativeElement;
        container.innerHTML = ''; // Clear previous content

        // Ensure container has appropriate size
        container.style.width = "100%";
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
    this.router.navigate(['teacher/exam-created-detail', this.examCode], {
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
}
