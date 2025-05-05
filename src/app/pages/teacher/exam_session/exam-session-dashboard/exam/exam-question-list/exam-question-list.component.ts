import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ExamQuestionListService } from "../../../../../../core/services/exam-question-list.service";

@Component({
  selector: "app-exam-question-list",
  imports: [CommonModule, RouterModule],
  templateUrl: "./exam-question-list.component.html",
  styleUrl: "./exam-question-list.component.scss",
})
export class ExamQuestionListComponent implements OnInit {
  exam_session_id = "";
  exam_session_name = "";
  exam_session_description = "";
  exam_name = "";
  exam_id = 0
  questions: any[] = [];
  answers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examQuestionList: ExamQuestionListService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.exam_session_id = params["exam_session_id"];
      this.exam_session_name = params["exam_session_name"];
      this.exam_session_description = params["exam_session_description"];
      this.exam_name = params["exam_name"]; // Lấy exam_name
      this.exam_id = params["exam_id"]; // Lấy exam_id
    });

    this.getQuestions();
  }

  goBack() {
    this.router.navigate(["/teacher/exam-session-dashboard"], {
      queryParams: {
        exam_session_id: this.exam_session_id,
        exam_session_name: this.exam_session_name,
        exam_session_description: this.exam_session_description,
      },
    });
  }

  getQuestions() {
    this.examQuestionList.getQuestionsByExamId(this.exam_id).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === 200) {
          this.questions = response.body.questions;
          this.answers = response.body.answers;
        }
      },
      error: (error) => {
        console.error("Error fetching questions:", error);
      },
    });
  }
}
