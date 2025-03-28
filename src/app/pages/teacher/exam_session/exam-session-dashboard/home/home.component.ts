import {CommonModule, DatePipe} from "@angular/common";
import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExamSessionService} from "../../../../../core/services/exam_session/exam-session.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ExamSession} from '../../../../../core/models/examSession.model';

@Component({
  selector: "app-home",
  imports: [ReactiveFormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  examForm: FormGroup;
  @Input() exam_session_id!: number;
  examSession!: ExamSession;
  showConfirmModal= false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe, // ✅ Đảm bảo đã inject DatePipe
    private router: Router,
    private examSessionService: ExamSessionService,
    private toastr: ToastrService
  ) {
    this.examForm = this.fb.group({
      exam_sessions_name: ["", Validators.required], // Tên kỳ thi
      exam_sessions_description: "",
      exam_sessions_password: [
        "",
        [Validators.required, Validators.minLength(6)],
      ], // Mật khẩu kỳ thi
      exam_sessions_start_date: ["", Validators.required], // Thời gian bắt đầu
      exam_sessions_end_date: ["", Validators.required], // Thời gian kết thúc
    });
  }

  ngOnInit(): void {
    if (this.exam_session_id) {
      this.getExamSessionById(this.exam_session_id);
    }
  }

  getExamSessionById(sessionId: number): void {
    this.examSessionService.getExamSessionInfoById(sessionId).subscribe({
      next: (response) => {
        console.log(response);
        this.examSession = response.body;
        console.log('Exam Session:', this.examSession);

        // Gán dữ liệu từ ExamSession vào FormGroup
        this.examForm.patchValue({
          exam_sessions_name: this.examSession.name,
          exam_sessions_description: this.examSession.description,
          exam_sessions_password: this.examSession.password,
          exam_sessions_start_date: this.datePipe.transform(this.examSession.startDate, 'yyyy-MM-ddTHH:mm'),
          exam_sessions_end_date: this.datePipe.transform(this.examSession.endDate, 'yyyy-MM-ddTHH:mm'),
        });
      },
      error: (err) => {
        console.error('Error fetching exam session:', err);
      },
    });
  }


  onSubmit() {
    console.log("Form status:", this.examForm.status);

    if (this.examForm.valid) {
      const formData = {
        ...this.examForm.value,
        exam_sessions_start_date: new Date(this.examForm.value.exam_sessions_start_date).toISOString(),
        exam_sessions_end_date: new Date(this.examForm.value.exam_sessions_end_date).toISOString()
      };

      console.log("Dữ liệu kỳ thi gửi đi:", formData);

      this.examSessionService
        .updateExamSessionInfoById(this.examSession.id, formData)
        .subscribe({
          next: (response) => {
            console.log("Phản hồi từ server:", response);
            if (response.status === 200) {
              this.toastr.success("Cập nhật kỳ thi thành công", "Thành công", {
                timeOut: 2000,
              });
              setTimeout(() => {
                this.router.navigate(["teacher/exam-session-dashboard"]);
              }, 1000);
            }
          },
          error: (error) => {
            console.error("Lỗi khi cập nhật kỳ thi:", error);
            this.toastr.error("Cập nhật kỳ thi thất bại", "Lỗi", { timeOut: 2000 });
          },
        });
    } else {
      console.log("Form invalid - Lỗi chi tiết:", this.examForm.errors);
      this.examForm.markAllAsTouched();
    }

  }

  openConfirmModal() {
    this.showConfirmModal = true;
  }

  confirmUpdate() {
    this.showConfirmModal = false;
    this.onSubmit(); // Gọi phương thức cập nhật kỳ thi
  }

  cancelUpdate() {
    this.showConfirmModal = false;
  }
}
