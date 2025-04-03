import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoadingComponent} from "../../../../../layout/loadings/loading/loading.component";
import {NgForOf, NgIf} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import * as docx from 'docx-preview';
import {ExamService} from '../../../../../core/services/exam/exam.service';
import {QuestionAnswerService} from '../../../../../core/services/question-answer/QuestionAnswer.service';
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

  // các biến để hiển thị file
  uploadFileUrl = '';
  @ViewChild("wordContainer") wordContainer!: ElementRef;
  selectedFileUrl: SafeResourceUrl | null = null;
  changeFile: boolean = false;
  fileRequest: File | null = null;

  // biến loading
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

  // các biến để xác định đề thi
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
    this.route.queryParams.subscribe(params => {
      this.exam_id = params['exam_id'];
      this.exam_session_id = params['exam_session_id'];
    });
    this.getExamById()
    this.getUploadExamQuestionAnswers()
  }
  //=========== lây dữ liệu từ backend ===========================================
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

        // Xử lý URL file Google Drive
        if (response.fileUrl) {
          this.uploadFileUrl = this.convertToPreviewUrl(response.fileUrl);
          console.log("Đường dẫn Google Drive sau xử lý:", this.uploadFileUrl);
        }
      },
      (error) => {
        console.error("Lỗi khi tải thông tin bài thi:", error);
      }
    );
  };

  convertToPreviewUrl(url: string): string {
    if (!url) return '';
    const match = url.match(/\/d\/(.*?)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : '';
  }

  //=========== các hàm xử lý phần model input và tab-left ========================
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

  setActiveTab(tab: string) {
    this.activeTab = tab;
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

  //============== các hàm xử lý phần hiển thị file  ==============================
  reloadFile() {
    this.changeFile = false;
    this.selectedFileUrl = null;
    this.wordContainer.nativeElement.innerHTML = ""; // Xóa nội dung cũ
  }

  onFileSelected(event: any) {
    this.changeFile = true;

    const file = event.target.files[0];
    if (!file) return;
    // Xóa đường dẫn PDF khi chọn file Word
    this.selectedFileUrl = null;

    if (file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      this.selectedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);

    }
    else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        const container = this.wordContainer.nativeElement;
        container.innerHTML = ""; // Xóa nội dung cũ

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

  uploadFile() {
    document.getElementById("fileInput")?.click();
  }

  // ================ các hàm xử lý phần submit và cancel ==========================
  onSubmit() {
    this.loading = true; // Bật loading khi gửi request

    // Lấy dữ liệu từ form
    const formData = new FormData();

    // Thêm các giá trị từ form vào formData
    formData.append('exam_name', this.examForm.get('exam_name')?.value);
    formData.append('exam_duration', this.examForm.get('exam_duration')?.value);
    formData.append('exam_description', this.examForm.get('exam_description')?.value);
    formData.append('exam_subject', this.examForm.get('exam_subject')?.value);
    formData.append('exam_start_date', this.examForm.get('exam_start_date')?.value);
    formData.append('exam_end_date', this.examForm.get('exam_end_date')?.value);


    // Nếu có file được thay đổi, thêm vào formData
    if (this.changeFile && this.fileRequest) {
      formData.append('file', this.fileRequest);
    }

    // Console log dữ liệu để kiểm tra
    console.log("Dữ liệu gửi đi:", formData);

    // Gửi dữ liệu lên backend
    this.examService.updateExam(this.exam_id, formData).subscribe(
      (response) => {
        console.log("Cập nhật bài thi thành công:", response);
        this.loading = false;
        // Điều hướng sang trang khác sau khi thành công
        this.router.navigate(["teacher/exam-session-dashboard"], { queryParams: { id: this.exam_session_id } });
      },
      (error) => {
        console.error("Lỗi khi cập nhật bài thi:", error);
        this.loading = false;
      }
    );
  }



  goBack() {
    this.router.navigate(["teacher/exam-session-dashboard"], { queryParams: { id: this.exam_session_id } });
  }
}
