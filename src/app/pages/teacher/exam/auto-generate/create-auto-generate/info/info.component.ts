import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ExamService } from "../../../../../../core/services/exam/exam.service";
import { QuestionService } from "../../../../../../core/services/question/question.service";
import { QuestionAnswerService } from "../../../../../../core/services/question-answer/QuestionAnswer.service";
import { NgIf } from "@angular/common";

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

  sendQuestionsToBackend() {
    const savedQuestions = localStorage.getItem("questions");
    if (!savedQuestions) {
      this.toastr.error("Không có dữ liệu câu hỏi để gửi.", "Lỗi");
      return;
    }

    try {
      const questions = JSON.parse(savedQuestions);
      console.log("questions", questions);

      if (!Array.isArray(questions)) {
        throw new Error("Dữ liệu không phải là một mảng.");
      }

      questions.forEach((question) => {
        console.log("question", question);

        this.questionService.sendQuestionData(question).subscribe({
          next: (response) => {
            const questionId = response.id;
            this.savedQuestionIds.push(questionId); // Lưu lại vào mảng
            console.log("ID câu hỏi được lưu:", questionId);
            console.log(this.savedQuestionIds);
            this.toastr.success(
              "Dữ liệu câu hỏi đã được gửi thành công.",
              "Thành công"
            );
          },

          error: (error) => {
            this.toastr.error("Gửi dữ liệu câu hỏi thất bại.", "Lỗi");
            console.error("Lỗi gửi dữ liệu câu hỏi:", error);
          },
        });
      });

      localStorage.removeItem("questions");
    } catch (e) {
      this.toastr.error("Dữ liệu câu hỏi không hợp lệ.", "Lỗi");
      console.error("Parse error:", e);
    }
  }

  formatAndSaveAnswers(questionIds: number[], rawAnswers: any[]): void {
    const formattedAnswers: any = {};

    questionIds.forEach((id, index) => {
      formattedAnswers[id] = rawAnswers[index];
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

  async sendQuestionsAndAnswersSequentially() {
    const savedQuestions = localStorage.getItem("questions");
    const savedAnswers = localStorage.getItem("answers");

    if (!savedQuestions || !savedAnswers) {
      this.toastr.error("Thiếu dữ liệu câu hỏi hoặc đáp án.", "Lỗi");
      return;
    }

    try {
      const questions = JSON.parse(savedQuestions);
      const answersWrapper = JSON.parse(savedAnswers);
      const rawAnswers = answersWrapper.answers || {}; // 👈 Quan trọng: lấy đúng object bên trong

      const tempFormattedAnswers: any = {};

      // 1. Gửi từng câu hỏi và gom đáp án tương ứng
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];

        const response = await this.questionService.sendQuestionData(question).toPromise();
        const questionId = response?.id;

        if (questionId) {
          this.savedQuestionIds.push(questionId);

          const matchingAnswer = rawAnswers[i]; // i vẫn là thứ tự ban đầu
          if (matchingAnswer) {
            tempFormattedAnswers[String(questionId)] = { ...matchingAnswer };
          }
        }
      }

      const answerData = {
        answers: tempFormattedAnswers
      };

      console.log("📦 Payload gửi đi:", JSON.stringify(answerData, null, 2));

      // 2. Gửi dữ liệu đáp án
      this.questionAnswerService.sendManualAnswers(answerData).subscribe({
        next: () => {
          this.toastr.success("Gửi đáp án thành công.", "Thành công");
          localStorage.removeItem("answers");
          localStorage.removeItem("questions");
        },
        error: (error) => {
          this.toastr.error("Lỗi gửi đáp án.", "Lỗi");
          console.error("❌ Lỗi gửi đáp án:", error);
        }
      });
    } catch (error) {
      this.toastr.error("Lỗi trong quá trình xử lý dữ liệu.", "Lỗi");
      console.error("❌ Lỗi toàn bộ quá trình:", error);
    }
  }








}
