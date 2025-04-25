import { QuestionAnswerService } from '../../../../../core/services/question-answer.service';
import { QuestionService } from '../../../../../core/services/question.service';
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-question-bank",
  imports: [],
  templateUrl: "./question-bank.component.html",
  styleUrl: "./question-bank.component.scss",
})
export class QuestionBankComponent {
  exam_session_id = "";
  exam_session_name = "";
  exam_session_description = "";
  isEditMode = false;
  questions: any[] = [];
  answers: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private questionAnwserService: QuestionAnswerService, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.exam_session_id = params["exam_session_id"] || "";
      this.exam_session_name = params["exam_session_name"] || "";
      this.exam_session_description = params["exam_session_description"] || "";
    });
  }

  navigateToQuestion() {
    this.router
      .navigate(["/exam/auto-generate/create-auto-generate/question"], {
        queryParams: {
          exam_session_id: this.exam_session_id,
          exam_session_name: this.exam_session_name,
          exam_session_description: this.exam_session_description,
        },
      })
  }
}
