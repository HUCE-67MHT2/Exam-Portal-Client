import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoadingComponent} from "../../../../../layout/loadings/loading/loading.component";
import {NgForOf, NgIf} from "@angular/common";
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import * as docx from 'docx-preview';
import {ExamService} from '../../../../../core/services/exam/exam.service';
import {QuestionAnswerService} from '../../../../../core/services/question-answer/QuestionAnswer';
import {NgxDocViewerModule} from 'ngx-doc-viewer';

@Component({
  selector: 'app-edit-exam-with-file',
  imports: [
    FormsModule,
    LoadingComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgxDocViewerModule
  ],
  templateUrl: './edit-exam-with-file.component.html',
  styleUrl: './edit-exam-with-file.component.scss'
})
export class EditExamWithFileComponent implements OnInit {
  examForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileUrl: string = '';
  uploadFileUrl = "";
  uploadMessage: string = '';
  loading: boolean = false;

  // Các biến cho tab, modal, đáp án (không thay đổi)
  activeTab: string = 'dapan';
  totalQuestions: number = 10;
  totalScore: number = 10;
  isQuickInputOpen: boolean = false;
  quickInputText: string = "";
  errorMessage: string = "";
  answers: { [key: number]: string } = {};
  answerOptions: string[] = ["A", "B", "C", "D"];
  @ViewChild("wordContainer") wordContainer!: ElementRef;
  fileRequest: any;
  exam_id: any;
  exam_session_id: any;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private examService: ExamService,
    private examQuestionAnswerService: QuestionAnswerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Khởi tạo form với các control cần thiết cho onSubmit()
    this.examForm = this.fb.group({
      exam_name: ['', Validators.required],
      exam_duration: ['', Validators.required],
      exam_description: [''],
      exam_subject: ['', Validators.required],
      exam_start_date: ['', Validators.required],
      exam_end_date: ['', Validators.required],
      // Nếu có thêm control nào khác cần dùng cho onSubmit, bổ sung tại đây
    });
  }

  ngOnInit() {
    this.initializeAnswers();
    this.route.queryParams.subscribe(params => {
      this.exam_id = params['exam_id'];
      this.exam_session_id = params['exam_session_id'];
    });
    this.getExamById()
    this.getUploadExamQuestionAnswers()
  }

  getExamById = () => {
    this.examService.getExamById(this.exam_id).subscribe(
      (response) => {
        console.log(response);
        this.examForm.patchValue({
          exam_name: response.name,
          exam_duration: response.duration,
          exam_description: response.description,
          exam_subject: response.subject,
          exam_start_date: this.formatDateTime(response.startDate),
          exam_end_date: this.formatDateTime(response.endDate),
        });

        // Xử lý đường dẫn Google Drive để lấy link xem trực tiếp
        if (response.fileUrl) {
          this.uploadFileUrl = response.fileUrl;
          console.log("Đường dẫn Google Drive:", this.uploadFileUrl);
        }
      },
      (error) => {
        console.error("Lỗi khi tải thông tin bài thi:", error);
      }
    );
  };

  // Chuyển đổi uploadFileUrl thành link xem trực tiếp
  get fileUrl(): string {
    if (!this.uploadFileUrl) return '';

    const match = this.uploadFileUrl.match(/\/d\/(.*?)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : '';
  }

  getUploadExamQuestionAnswers = () => {
    this.examQuestionAnswerService.getUploadQuestionAnswers(this.exam_id).subscribe(
      (response) => {
        this.totalQuestions = response.length / 4;

        // Xử lý để lấy đáp án đúng
        this.answers = response.reduce((acc: { [key: number]: string }, item: { correct: boolean; questionNo: number; answerText: string }) => {
          if (item.correct) {
            acc[item.questionNo] = item.answerText;
          }
          return acc;
        }, {});
      },
      (error) => {
        console.error("Lỗi khi tải đáp án:", error);
      }
    );
  };

  uploadFile() {
    document.getElementById("fileInput")?.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Clear the backend file URL when a new file is selected
    this.uploadFileUrl = '';

    if (file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      this.selectedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL) as string;
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        const container = this.wordContainer.nativeElement;
        container.innerHTML = ""; // Clear old content

        // Ensure container has appropriate size
        container.style.width = "100%";
        container.style.height = "570px";
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
      newAnswers[i] = this.answers[i] || ""; // Retain old answers if available
    }
    this.answers = newAnswers;
  }

  getQuestionScore() {
    return (
      this.totalQuestions > 0 ? this.totalScore / this.totalQuestions : 0
    ).toFixed(2);
  }

  openQuickInput() {
    this.isQuickInputOpen = true;
    console.log(this.answers);
  }

  processQuickInput() {
    this.errorMessage = "";
    // Chuyển chuỗi thành chữ hoa và loại bỏ khoảng trắng
    const input = this.quickInputText.toUpperCase().trim();

    // Kiểm tra nếu chuỗi chứa ký tự không hợp lệ (không phải A, B, C, D)
    if (!/^[ABCD]+$/.test(input)) {
      this.errorMessage =
        "Chuỗi nhập vào chỉ được chứa các ký tự hoa thường A, B, C, D!";
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

  private formatDateTime(dateTimeLocal: string): string {
    if (!dateTimeLocal) return '';

    const date = new Date(dateTimeLocal);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = "00"; // Mặc định giây = 00

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  onSubmit = () => {
  };

  goBack() {
    this.router.navigate(["teacher/exam-session-dashboard"], { queryParams: { id: this.exam_session_id } });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  private initializeAnswers() {
    this.answers = {};
    for (let i = 1; i <= this.totalQuestions; i++) {
      this.answers[i] = ""; // Default to empty or set a default value like 'A'
    }
  }
}
