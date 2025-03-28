import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-question",
  imports: [FormsModule, CommonModule],
  templateUrl: "./question.component.html",
  styleUrl: "./question.component.scss",
})
export class QuestionComponent {
  questions: any[] = []; // Array to hold the questions
  questionNumber: number = 0; // Number of questions to generate

  onQuestionNumberChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const numberOfQuestions = parseInt(input.value, 10) || 0;
    this.questions = Array(numberOfQuestions).fill({});
  }

  generateQuestions(): void {
    const validNumber = this.questionNumber > 0 ? this.questionNumber : 0;
    this.questions = Array.from({ length: validNumber }, () => ({}));
  }
}
