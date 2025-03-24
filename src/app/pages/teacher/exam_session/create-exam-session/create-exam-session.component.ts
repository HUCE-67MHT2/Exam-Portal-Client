import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { DatePipe, CommonModule } from '@angular/common';
  import { HeaderComponent } from '../../../../layout/header/header.component';
  import { NgOptimizedImage } from '@angular/common';

  @Component({
    selector: 'app-create-exam-session',
    templateUrl: './create-exam-session.component.html',
    styleUrls: ['./create-exam-session.component.scss'],
    providers: [DatePipe],
    imports: [
      ReactiveFormsModule,
      HeaderComponent,
      CommonModule,
      NgOptimizedImage,
    ],
  })
  export class CreateExamSessionComponent {
    examForm: FormGroup;

    constructor(private fb: FormBuilder, private datePipe: DatePipe) {
      this.examForm = this.fb.group({
        exam_sessions_name: ['', Validators.required], // Tên kỳ thi
        exam_sessions_description: '',
        exam_sessions_password: ['', [Validators.required, Validators.minLength(6)]], // Mật khẩu kỳ thi
        exam_sessions_start_date: ['', Validators.required], // Thời gian bắt đầu
        exam_sessions_end_date: ['', Validators.required], // Thời gian kết thúc
      });
    }

    onSubmit() {
      console.log('Form status:', this.examForm.status);

      if (this.examForm.valid) {
        const formData = {
          ...this.examForm.value,
          exam_sessions_start_date: this.datePipe.transform(
            this.examForm.value.exam_sessions_start_date,
            'dd/MM/yyyy HH:mm'
          ),
          exam_sessions_end_date: this.datePipe.transform(
            this.examForm.value.exam_sessions_end_date,
            'dd/MM/yyyy HH:mm'
          )
        };
        console.log('Dữ liệu kỳ thi:', formData);
        // Gọi API hoặc xử lý dữ liệu ở đây
      } else {
        console.log('Form invalid - Lỗi chi tiết:', this.examForm.errors);
        this.examForm.markAllAsTouched();
      }
    }

    goBack() {
      console.log('Go to Exam');
    }
  }
