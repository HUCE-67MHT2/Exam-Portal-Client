import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { ExamService } from "../../../../../../core/services/exam/exam.service"; // Cập nhật đúng path nếu khác

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
  imports:[ ReactiveFormsModule],
  standalone: true,
})
export class InfoComponent implements OnInit, OnDestroy {
  examForm: FormGroup;
  selectedExamType: string | null = null;
  examName: string = "";
  examPassword: string = "";

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.examForm = this.fb.group({
      exam_name: ["", Validators.required],
      exam_duration: ["", Validators.required],
      exam_description: [""],
      exam_subject: ["", Validators.required],
      exam_start_date: ["", Validators.required],
      exam_end_date: ["", Validators.required]
    });
  }

  ngOnInit() {
    const savedInfo = localStorage.getItem("info");
    if (savedInfo) {
      const info = JSON.parse(savedInfo);
      this.examName = info.examName || "";
      this.selectedExamType = info.examType || null;
      this.examPassword = info.examPassword || "";
    }
  }

  ngOnDestroy() {
    const info = {
      examName: this.examName,
      examType: this.selectedExamType,
      examPassword: this.examPassword,
    };
    localStorage.setItem("info", JSON.stringify(info));
  }

  toggleExamTypeList() {
    const element = document.getElementById("examTypeList");
    if (element) {
      element.classList.toggle("active");
    }
  }

  selectExamType(type: string) {
    this.selectedExamType = type;
    localStorage.setItem("selectedExamType", type);
    const element = document.getElementById("examTypeList");
    if (element) {
      element.classList.remove("active");
    }
  }

  onSubmit() {
    if (this.examForm.invalid) {
      this.examForm.markAllAsTouched();
      this.toastr.error("Vui lòng kiểm tra lại thông tin.", "Lỗi");
      return;
    }

    const examData = this.examForm.value;
    // Gọi service để gửi dữ liệu lên backend
  }
}
