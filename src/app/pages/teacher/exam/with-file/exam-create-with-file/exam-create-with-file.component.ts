import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from "@angular/forms";
import * as docx from "docx-preview";
import {
  CreateExamWithFileService
} from "../../../../../core/services/exam/create_exam_with_file/create-exam-with-file.service";
import {LoadingComponent} from "../../../../../layout/loading/loading.component";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: "app-exam-create-with-file",
  imports: [NgIf, ReactiveFormsModule, FormsModule, NgForOf, LoadingComponent],
  templateUrl: "./exam-create-with-file.component.html",
  styleUrl: "./exam-create-with-file.component.scss",
  providers: [CreateExamWithFileService],
})
export class ExamCreateWithFileComponent implements OnInit {
  examForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileUrl: SafeResourceUrl | null = null;
  uploadMessage: string = '';
  loading: boolean = false;

  // Các biến cho tab, modal, đáp án (không thay đổi)
  activeTab: string = 'dapan';
  totalQuestions: number = 5;
  totalScore: number = 10;
  isQuickInputOpen: boolean = false;
  quickInputText: string = "";
  errorMessage: string = "";
  answers: { [key: number]: string } = {};
  answerOptions: string[] = ["A", "B", "C", "D"];
  @ViewChild("wordContainer") wordContainer!: ElementRef;
  fileRequest: any;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private examService: CreateExamWithFileService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Khởi tạo form với các control cần thiết cho onSubmit()
    this.examForm = this.fb.group({
      exam_name: ['', Validators.required],
      exam_duration: ['', Validators.required],
      exam_description: ['']
      // Nếu có thêm control nào khác cần dùng cho onSubmit, bổ sung tại đây
    });
  }

  exam_session_id: any;

  ngOnInit() {
    this.initializeAnswers();
    this.route.queryParams.subscribe(params => {
      this.exam_session_id = params['id'];
    });
    console.log(this.exam_session_id);
  }

  uploadFile() {
    document.getElementById("fileInput")?.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Xóa đường dẫn PDF khi chọn file Word
    this.selectedFileUrl = null;

    if (file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      this.selectedFileUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
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

  getQuestions(): number[] {
    return Array.from({length: this.totalQuestions}, (_, i) => i);
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

  onSubmit = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
    // Kiểm tra xem form có hợp lệ và file đã được chọn chưa
    if (this.examForm.invalid || !this.selectedFile) {
      this.uploadMessage = 'Vui lòng điền đầy đủ thông tin và chọn file';
      console.log('Form không hợp lệ hoặc chưa chọn file');
      return;
    }
    this.loading = true;

    const examNameValue = this.examForm.get('exam_name')?.value;
    const examDurationValue = this.examForm.get('exam_duration')?.value;
    const examDescriptionValue = this.examForm.get('exam_description')?.value;

    const formData = new FormData();
    formData.append('examSessionId', this.exam_session_id);
    formData.append('name', examNameValue);
    formData.append('duration', examDurationValue);
    formData.append('description', examDescriptionValue);
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('subject', "Toán");
    formData.append('startDate', "2025-04-04 00:00:00");
    formData.append('endDate', "2025-05-04 00:00:00");

    this.examService.uploadExamWithFile(formData).subscribe({
      next: () => {
        this.uploadMessage = 'Tạo kỳ thi thành công!';
        this.loading = false;
        this.router.navigate(["teacher/exam-session-dashboard"], {queryParams: {id: this.exam_session_id}});
      },
      error: (err) => {
        console.error(err);
        this.uploadMessage = 'Upload thất bại!';
        this.loading = false;
      }
    });
  }
  ;

  goBack() {
    this.router.navigate(["teacher/exam-create-type"], {queryParams: {id: this.exam_session_id}});
  }

  setActiveTab(tab
               :
               string
  ) {
    this.activeTab = tab;
  }

  private initializeAnswers() {
    this.answers = {};
    for (let i = 1; i <= this.totalQuestions; i++) {
      this.answers[i] = ""; // Default to empty or set a default value like 'A'
    }
  }
}
