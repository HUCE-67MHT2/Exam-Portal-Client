import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ExamService } from "../../../../../../core/services/exam.service";
import { QuestionService } from "../../../../../../core/services/question.service";
import { QuestionAnswerService } from "../../../../../../core/services/question-answer.service";
import { NgIf } from "@angular/common";
import { catchError, forkJoin, Observable, of, tap, throwError } from "rxjs";

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
  @Input() exam_session_id!: string;
  @Input() exam_session_name!: string;
  @Input() exam_session_description!: string;

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private questionService: QuestionService,
    private questionAnswerService: QuestionAnswerService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.examForm = this.fb.group({
      number_of_exam: ["", Validators.required],
      exam_name: ["", Validators.required],
      exam_duration: ["", Validators.required],
      exam_description: [""],
      exam_subject: ["", Validators.required],
      exam_start_date: ["", Validators.required],
      exam_end_date: ["", Validators.required],
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
      this.saveToLocalStorage();
    });
  }

  ngOnDestroy() {
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    const info = {
      examForm: this.examForm.value,
    };
    localStorage.setItem("info", JSON.stringify(info));
    console.log("Dữ liệu đã lưu vào localStorage:", info);
  }

  onSubmit() {
    if (this.examForm.invalid) {
      this.examForm.markAllAsTouched();
      this.toastr.error("Vui lòng kiểm tra lại thông tin.", "Lỗi");
      return;
    }

    this.router.navigate(["teacher/exam-session-dashboard"], {
      queryParams: {
        exam_session_id: this.exam_session_id,
        exam_session_name: this.exam_session_name,
        exam_session_description: this.exam_session_description,
      },
    });
    localStorage.removeItem("info");
    localStorage.removeItem("questionNumber");
    localStorage.removeItem("questions");
    localStorage.removeItem("answers");
  }

  sendInfoToBackend() {
    const savedInfo = localStorage.getItem("info");
    if (!savedInfo) {
      this.toastr.error("Không có dữ liệu để gửi.", "Lỗi");
      return;
    }

    try {
      const info = JSON.parse(savedInfo);
      this.examService.sendExamManuallyData(info).subscribe({
        next: () => {
          this.toastr.success("Dữ liệu đã được gửi thành công.", "Thành công");
          localStorage.removeItem("info");
        },
        error: (error) => {
          this.toastr.error("Gửi dữ liệu thất bại. Vui lòng thử lại.", "Lỗi");
          console.error("Lỗi gửi dữ liệu bài thi:", error);
        },
      });
    } catch (e) {
      this.toastr.error("Dữ liệu không hợp lệ.", "Lỗi");
      console.error("Parse error:", e);
    }
  }

  sendQuestionsToBackend(): Observable<any[]> {
    const savedQuestions = localStorage.getItem("questions");

    if (!savedQuestions) {
      this.toastr.error("Không có dữ liệu câu hỏi để gửi.", "Lỗi");
      return of([]); // Trả về Observable rỗng để tránh lỗi
    }

    try {
      const questions = JSON.parse(savedQuestions);

      if (!Array.isArray(questions)) {
        throw new Error("Dữ liệu không phải là một mảng.");
      }

      const requests = questions.map((question: any) =>
        this.questionService.sendQuestionData(question)
      );

      return forkJoin(requests).pipe(
        tap((responses) => {
          responses.forEach((response: any) => {
            const questionId = response.id;
            this.savedQuestionIds.push(questionId);
            console.log("ID câu hỏi được lưu:", questionId);
          });
          this.toastr.success("Tất cả câu hỏi đã được gửi thành công.", "Thành công");
          localStorage.removeItem("questions");
        }),
        catchError((err) => {
          this.toastr.error("Gửi dữ liệu câu hỏi thất bại.", "Lỗi");
          console.error("Lỗi gửi dữ liệu câu hỏi:", err);
          return throwError(() => err);
        })
      );
    } catch (e) {
      this.toastr.error("Dữ liệu câu hỏi không hợp lệ.", "Lỗi");
      console.error("Parse error:", e);
      return throwError(() => e);
    }
  }


  formatAndSaveAnswers(questionIds: number[], rawAnswers: any[]): void {
    const formattedAnswers: Record<string, any> = {};

    questionIds.forEach((id, index) => {
      const key = id.toString(); // Chuyển number thành string
      formattedAnswers[key] = rawAnswers[index];
    });

    const result = { answers: formattedAnswers };

    // Lưu vào localStorage
    localStorage.setItem("answers", JSON.stringify(result));

    console.log("✅ Đã lưu answers format vào localStorage:", result);
  }


  getAnswerData() {
    const savedAnswers = localStorage.getItem("answers");

    if (savedAnswers) {
      const rawAnswers = JSON.parse(savedAnswers);
      this.formatAndSaveAnswers(this.savedQuestionIds, rawAnswers);
    }
  }

  submitFormattedAnswers(): void {
    // Bước 1: Gọi hàm format lại dữ liệu
    this.getAnswerData();

    // Bước 2: Lấy dữ liệu đã format
    const formattedData = localStorage.getItem("answers");

    if (formattedData) {
      const answerData = JSON.parse(formattedData);

      // Bước 3: Gửi dữ liệu qua API
      this.questionAnswerService.sendManualAnswers(answerData).subscribe({
        next: (res) => {
          console.log("✅ Gửi dữ liệu thành công:", res);
        },
        error: (err) => {
          console.error("❌ Gửi dữ liệu thất bại:", err);
        }
      });
    } else {
      console.warn("⚠️ Không tìm thấy dữ liệu answers trong localStorage.");
    }
  }

  handleSubmitAll(): void {
    this.sendQuestionsToBackend().subscribe({
      next: () => {
        // ✅ Sau khi gửi câu hỏi xong thì mới gửi đáp án
        this.submitFormattedAnswers();
      },
      error: (err) => {
        console.error("❌ Dừng quy trình vì lỗi gửi câu hỏi:", err);
      }
    });
  }



}
