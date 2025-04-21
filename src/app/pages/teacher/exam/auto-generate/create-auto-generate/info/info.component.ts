import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExamSessionService} from "../../../../../../core/services/exam-session.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgIf} from "@angular/common";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
  imports: [ReactiveFormsModule, NgIf],
  standalone: true,
})
export class InfoComponent implements OnInit, OnDestroy {
  examForm: FormGroup;
  selectedExamType: string | null = null;
  examName: string = "";
  examPassword: string = "";
  savedQuestionIds: number[] = [];
  examSessionId: string = "";
  @Input() exam_session_id!: string;
  @Input() exam_session_name!: string;
  @Input() exam_session_description!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private examSessionService: ExamSessionService,
    private toastr: ToastrService
  ) {
    this.examSessionId = localStorage.getItem("exam_session_id") || "";

    this.examForm = this.fb.group({
      exam_name: ["", Validators.required],
      exam_duration: ["", Validators.required],
      exam_description: [""],
      exam_subject: ["", Validators.required],
      exam_start_date: ["", Validators.required],
      exam_end_date: ["", Validators.required],
      number_of_exam: ["", Validators.required],
      exam_number_of_test: ["", Validators.required],
    });
  }

  ngOnInit() {
    const savedInfo = localStorage.getItem("info");
    if (savedInfo) {
      const info = JSON.parse(savedInfo);
      this.examName = info.examName || "";
      this.selectedExamType = info.examType || null;
      this.examPassword = info.examPassword || "";
      this.examForm.patchValue(info.examForm || {});
    }

    // Lắng nghe mọi thay đổi trong form
    this.examForm.valueChanges.subscribe((formValue) => {
      this.saveNumberOfExamAndTest();
      this.saveExamInfo();
    });
  }

  ngOnDestroy() {
    // Xóa dữ liệu khỏi localStorage khi component bị hủy
    localStorage.removeItem("info");
    localStorage.removeItem("examInfoNumber");
    localStorage.removeItem("examInfo");
  }



  onSubmit() {
    if (this.examForm.invalid) {
      this.examForm.markAllAsTouched();
      this.toastr.error("Vui lòng kiểm tra lại thông tin.", "Lỗi");
      return;
    }

    this.sendNumberOfExamAndTestToBackend();

    this.router.navigate(["teacher/exam-session-dashboard"], {
      queryParams: {
        exam_session_id: this.exam_session_id,
        exam_session_name: this.exam_session_name,
        exam_session_description: this.exam_session_description,
      },
    });
  }

  saveExamInfo() {
    const examInfo = {
      examSessionId: this.examSessionId,
      name: this.examForm.get("exam_name")?.value,
      duration: this.examForm.get("exam_duration")?.value,
      description: this.examForm.get("exam_description")?.value,
      subject: this.examForm.get("exam_subject")?.value,
      startDate: this.examForm.get("exam_start_date")?.value,
      endDate: this.examForm.get("exam_end_date")?.value,
    };

    localStorage.setItem("examInfo", JSON.stringify(examInfo));
    console.log("Dữ liệu examInfo đã được lưu vào localStorage");
  }

  saveNumberOfExamAndTest() {
    const defaultQuestionPerExam = this.examForm.get('number_of_exam')?.value;

    const examInfoNumber = {
      id: this.examSessionId,
      defaultQuestionPerExam: defaultQuestionPerExam,
    }

    localStorage.setItem("examInfoNumber", JSON.stringify(examInfoNumber));
    console.log("Dữ liệu number_of_exam được lưu vào localStorage");
  }

  private parseFormValues(): { defaultQuestionPerExam: number, examSessionId: number } | null {
    const defaultQuestionPerExam = parseInt(this.examForm.get('number_of_exam')?.value, 10);
    const examSessionId = parseInt(this.examSessionId, 10);

    if (isNaN(defaultQuestionPerExam)  || isNaN(examSessionId)) {
      this.toastr.error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.", "Lỗi");
      return null;
    }

    return { defaultQuestionPerExam, examSessionId };
  }

  sendNumberOfExamAndTestToBackend() {
    const parsedValues = this.parseFormValues();
    if (!parsedValues) {
      return; // Dừng lại nếu dữ liệu không hợp lệ
    }

    const { defaultQuestionPerExam, examSessionId } = parsedValues;

    this.examSessionService.updateExamSessionConfiguration(
      examSessionId,
      defaultQuestionPerExam
    ).subscribe({
      next: (response) => {
        this.toastr.success('Cập nhật cấu hình kỳ thi thành công!', 'Thành công');
        console.log('Response from backend:', response);
      },
      error: (error) => {
        this.toastr.error('Có lỗi xảy ra khi cập nhật cấu hình kỳ thi.', 'Lỗi');
        console.error('Error from backend:', error);
      },
    });
  }
}
