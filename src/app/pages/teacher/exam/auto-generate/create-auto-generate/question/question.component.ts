import {Component, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: "app-question",
  imports: [FormsModule, CommonModule],
  templateUrl: "./question.component.html",
  styleUrl: "./question.component.scss",
})
export class QuestionComponent implements OnInit {
  questions: any[] = []; // Array to hold the questions
  questionNumber: number = 0; // Number of questions to generate
  input: any;
  private saveTimeout: any; // Timeout for debouncing saveState

  ngOnInit(): void {
    const savedQuestions = localStorage.getItem("questions");
    const savedQuestionNumber = localStorage.getItem("questionNumber");
    if (savedQuestions) {
      this.questions = JSON.parse(savedQuestions);

      // Ensure all questions have an initialized answers object
      this.questions.forEach((question) => {
        if (!question.answers) {
          question.answers = {
            "1": "",
            "2": "",
            "3": "",
            "4": "",
          };
        }
      });
    }
    if (savedQuestionNumber) {
      this.questionNumber = parseInt(savedQuestionNumber, 10);
    }
  }

  onQuestionNumberChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const numberOfQuestions = parseInt(input.value, 10) || 0;

    // Adjust the questions array size without overwriting existing data
    if (numberOfQuestions > this.questions.length) {
      for (let i = this.questions.length; i < numberOfQuestions; i++) {
        this.questions.push({
          text: "",
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

    this.saveState();
  }

  generateQuestions(): void {
    const validNumber = this.questionNumber > 0 ? this.questionNumber : 0;

    // Adjust the questions array size without overwriting existing data
    if (validNumber > this.questions.length) {
      for (let i = this.questions.length; i < validNumber; i++) {
        this.questions.push({
          text: "",
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

  public saveState(): void {
    clearTimeout(this.saveTimeout); // Clear any existing timeout
    this.saveTimeout = setTimeout(() => {
      // Ensure all questions have an initialized answers object
      this.questions.forEach((question) => {
        if (!question.answers) {
          question.answers = {
            "1": "",
            "2": "",
            "3": "",
            "4": "",
          };
        }
      });

      localStorage.setItem("questions", JSON.stringify(this.questions));
      localStorage.setItem("questionNumber", this.questionNumber.toString());
    }, 300); // Save after 300ms of inactivity
  }
}
