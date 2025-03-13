import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

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
export class ExamCreateWithFileComponent {
  activeTab: string = 'dapan'; // Mặc định hiển thị tab "Đáp án"
  examForm: FormGroup; // ✅ Biến chứa dữ liệu form
  totalQuestions: number = 5;
  totalScore: number = 10;
  isQuickInputOpen: boolean = false;
  quickInputText: string = '';
  questions: { text: string }[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.examForm = this.fb.group({
      tenKyThi: ['', Validators.required],
      loaiKyThi: ['', Validators.required],
      maKyThi: ['', [Validators.required, Validators.minLength(5)]],
      matKhauKyThi: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.initializeQuestions();
  }

  onSubmit() {
    if (this.examForm.valid) {
      console.log('Dữ liệu gửi đi:', this.examForm.value);
      alert('Tạo kỳ thi thành công!');
    } else {
      alert('Vui lòng nhập đầy đủ thông tin.');
    }
  }
  goBack() {
    this.router.navigate(['teacher/exam-create-type']);
  }

  discard() {

  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onTotalQuestionsChange() {
    this.initializeQuestions()
  }

  onTotalScoreChange() {
    console.log('Total score changed');
  }

  openQuickInput() {
    this.isQuickInputOpen = true;
  }

  processQuickInput() {
    console.log('Chuỗi nhập nhanh:', this.quickInputText);
    this.isQuickInputOpen = false;
  }

  private initializeQuestions() {
    this.questions = Array.from({ length: this.totalQuestions }, (_, i) => ({
      text: `Câu ${i + 1}`,
    }));
  }
}
