import {Component, Input, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: "app-question",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.scss"],
})
export class QuestionComponent implements OnInit {
  questions: any[] = []; // Danh sách câu hỏi
  questionNumber: number = 0; // Số lượng câu hỏi muốn tạo
  input: any;
  @Input() exam_session_id!: string;
  @Input() exam_session_name!: string;
  @Input() exam_session_description!: string;
  private saveTimeout: any; // Timeout để debounce việc lưu

  ngOnInit(): void {
    const savedQuestions = localStorage.getItem("questions");
    const savedQuestionNumber = localStorage.getItem("questionNumber");

    if (savedQuestions) {
      const parsedQuestions = JSON.parse(savedQuestions);
      this.questions = parsedQuestions.map((q: any, index: number) => ({
        text: q.text || "",
        examSessionId: this.exam_session_id,
        answers: {
          "1": "",
          "2": "",
          "3": "",
          "4": "",
        },
      }));
    }

    if (savedQuestionNumber) {
      this.questionNumber = parseInt(savedQuestionNumber, 10);
    }
  }

  onQuestionNumberChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const numberOfQuestions = parseInt(input.value, 10) || 0;

    // Cập nhật danh sách câu hỏi
    if (numberOfQuestions > this.questions.length) {
      for (let i = this.questions.length; i < numberOfQuestions; i++) {
        this.questions.push({
          text: "",
          examSessionId: this.exam_session_id,
          answers: {
            "1": "",
            "2": "",
            "3": "",
            "4": "",
          },
        });
      }
    } else if (numberOfQuestions < this.questions.length) {
      this.questions.splice(numberOfQuestions);
    }

    this.questionNumber = numberOfQuestions;
    this.saveState();
  }

  generateQuestions(): void {
    const validNumber = this.questionNumber > 0 ? this.questionNumber : 0;

    if (validNumber > this.questions.length) {
      for (let i = this.questions.length; i < validNumber; i++) {
        this.questions.push({
          text: "",
          examSessionId: this.exam_session_id,
          answers: {
            "1": "",
            "2": "",
            "3": "",
            "4": "",
          },
        });
      }
    } else if (validNumber < this.questions.length) {
      this.questions.splice(validNumber);
    }

    this.saveState();
  }

  saveState(): void {
    clearTimeout(this.saveTimeout);

    this.saveTimeout = setTimeout(() => {
      const questionsData = this.questions.map((question) => ({
        examSessionId: this.exam_session_id,
        content: question.text,
      }));
      const answers = this.questions.map((question) => question.answers);

      localStorage.setItem("questions", JSON.stringify(questionsData));
      localStorage.setItem("answers", JSON.stringify(answers));
      localStorage.setItem("questionNumber", this.questionNumber.toString());
    }, 300);
  }
}
