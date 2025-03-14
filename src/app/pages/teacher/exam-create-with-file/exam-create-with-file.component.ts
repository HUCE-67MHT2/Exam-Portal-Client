import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-exam-create-with-file',
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './exam-create-with-file.component.html',
  styleUrl: './exam-create-with-file.component.scss'
})
export class ExamCreateWithFileComponent implements OnInit {
  activeTab: string = 'dapan'; // Default tab is "Đáp án"
  examForm: FormGroup; // Form data
  totalQuestions: number = 10;
  totalScore: number = 10;
  isQuickInputOpen: boolean = false;
  quickInputText: string = '';
  answerOptions: string[] = ['A', 'B', 'C', 'D'];
  answers: { [key: number]: string } = {}; // Store answers as {[1: "C"], [2: "B"]}

  constructor(private fb: FormBuilder, private router: Router) {
    this.examForm = this.fb.group({
      tenKyThi: ['', Validators.required],
      loaiKyThi: ['', Validators.required],
      maKyThi: ['', [Validators.required, Validators.minLength(5)]],
      matKhauKyThi: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.initializeAnswers();
  }

  private initializeAnswers() {
    this.answers = {};
    for (let i = 1; i <= this.totalQuestions; i++) {
      this.answers[i] = ''; // Default to empty or set a default value like 'A'
    }
  }

  getQuestions(): number[] {
    return Array.from({ length: this.totalQuestions }, (_, i) => i);
  }

  onTotalQuestionsChange() {
    const newAnswers: { [key: number]: string } = {};
    for (let i = 1; i <= this.totalQuestions; i++) {
      newAnswers[i] = this.answers[i] || ''; // Retain old answers if available
    }
    this.answers = newAnswers;
  }

  submitExam() {
    console.log('Exam data:', this.answers);
  }

  onSubmit() {
    if (this.examForm.valid) {
      console.log('Form data:', this.examForm.value);
      alert('Exam created successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  }

  goBack() {
    this.router.navigate(['teacher/exam-create-type']);
  }

  discard() {
    // Add discard logic here
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onTotalScoreChange() {
    console.log('Total score changed');
  }

  openQuickInput() {
    this.isQuickInputOpen = true;
  }

  processQuickInput() {
    console.log('Quick input string:', this.quickInputText);
    this.isQuickInputOpen = false;
  }
}
