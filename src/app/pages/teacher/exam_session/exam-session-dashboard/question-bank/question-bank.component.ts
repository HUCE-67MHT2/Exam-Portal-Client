import { QuestionAnswerService } from "../../../../../core/services/question-answer.service";
import { QuestionService } from "../../../../../core/services/question.service";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-question-bank",
  imports: [CommonModule, FormsModule],
  templateUrl: "./question-bank.component.html",
  styleUrl: "./question-bank.component.scss",
})
export class QuestionBankComponent {
  examSessionId = "";
  exam_session_id = "";
  exam_session_name = "";
  exam_session_description = "";
  isEditing = false;
  questions: any[] = [];
  questionsId: number[] = [];
  questionsIdDelete: number[] = [];
  questionContent = "";
  answerResponse: any[] = [];
  answers: any[] = [];
  questionAnswer: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionAnwserService: QuestionAnswerService,
    private questionService: QuestionService,
    private toastr: ToastrService
  ) {
    this.examSessionId = JSON.parse(
      localStorage.getItem("selectedSession") || "{}"
    ).id;
  }

  ngOnInit(): void {
    this.getQuestions();
    this.route.queryParams.subscribe((params) => {
      this.exam_session_id = params["exam_session_id"] || "";
      this.exam_session_name = params["exam_session_name"] || "";
      this.exam_session_description = params["exam_session_description"] || "";
    });
  }

  navigateToQuestion() {
    this.router.navigate(
      ["/exam/auto-generate/create-auto-generate/question"],
      {
        queryParams: {
          exam_session_id: this.exam_session_id,
          exam_session_name: this.exam_session_name,
          exam_session_description: this.exam_session_description,
        },
      }
    );
  }

  getQuestions() {
    this.questionService
      .getQuestionsByExamSessionId(this.examSessionId)
      .subscribe((response) => {
        this.questions = response.questions;
        console.log("Questions:", this.questions);
        this.getQuestionId();
        console.log("Questions ID:", this.questionsId);
        this.getAnswersResponse();
      });
  }

  getQuestionId() {
    for (let i = 0; i < this.questions.length; i++) {
      this.questionsId.push(this.questions[i].id);
    }
  }

  getAnswersResponse() {
    const requests = this.questionsId.map((questionId) =>
      this.questionAnwserService.getAutoGeneratedAnswers(questionId)
    );

    forkJoin(requests).subscribe({
      next: (responses) => {
        this.answerResponse = responses;
        console.log("AnswersRP:", this.answerResponse);
      },
      error: (err) => {
        console.error("Failed to load answers", err);
      },
    });
  }

  getAnswers() {
    this.answerResponse.forEach((answer) => {
      this.answers.push(answer);
      console.log("Answers:", this.answers);
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  handleEditButtonClick() {
    if (this.isEditing) {
      this.onUpdateAllQuestions(); // Gọi hàm cập nhật khi đang ở chế độ chỉnh sửa
      this.sendDeleteQuestion();
    }
    this.toggleEdit(); // Chuyển đổi trạng thái isEditing
  }

  deleteQuestion(index: number) {
    if (confirm("Bạn muốn xóa câu hỏi này?")) {
      this.questionsIdDelete.push(this.questions[index].id);
      this.questions.splice(index, 1);
      this.answerResponse.splice(index, 1);
    }
  }

  onUpdateAllQuestions() {
    let successCount = 0;
    let errorCount = 0;
    const totalQuestions = this.questions.length;

    this.questions.forEach((question) => {
      this.questionService.updateQuestion(question.id, question).subscribe({
        next: () => {
          successCount++;
          if (successCount + errorCount === totalQuestions) {
            this.showResult(successCount, errorCount, "cập nhật", "Tất cả");
          }
        },
        error: () => {
          errorCount++;
          if (successCount + errorCount === totalQuestions) {
            this.showResult(successCount, errorCount, "cập nhật", "Tất cả");
          }
        },
      });
    });
  }

  sendDeleteQuestion() {
    let successCount = 0;
    let errorCount = 0;
    const totalDeletions = this.questionsIdDelete.length;

    if (totalDeletions === 0) {
      // this.toastr.info("Không có câu hỏi nào để xóa.", "Thông báo");
      return;
    }

    this.questionsIdDelete.forEach((questionId) => {
      this.questionService.deleteQuestion(questionId).subscribe({
        next: () => {
          successCount++;
          if (successCount + errorCount === totalDeletions) {
            this.showResult(successCount, errorCount, "xóa", "Câu hỏi");
          }
        },
        error: () => {
          errorCount++;
          if (successCount + errorCount === totalDeletions) {
            this.showResult(successCount, errorCount, "xóa", "Câu hỏi");
          }
        },
      });
    });

    this.questionsIdDelete = []; // Reset danh sách sau khi xóa
  }

  private showResult(successCount: number, errorCount: number, action: string, countString: string) {
    if (errorCount === 0) {
      this.toastr.success(
        `${countString} câu hỏi đã được ${action} thành công!`
      );
    } else {
      this.toastr.error(
        `${successCount} câu hỏi ${action} thành công, ${errorCount} câu hỏi thất bại.`,
        "Lỗi"
      );
    }
  }
}
