import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from '../../../../layout/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-exam-session',
  templateUrl: './create-exam-session.component.html',
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    CommonModule,
  ],
  styleUrls: ['./create-exam-session.component.scss'],

})
export class CreateExamSessionComponent {
  examForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.examForm = this.fb.group({
      tenKyThi: ['', Validators.required],
      loaiKyThi: ['', Validators.required],
      matKhauKyThi: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      thoiGianBatDau: ['', Validators.required],
      thoiGianKetThuc: ['', Validators.required],
      maKyThi: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      thoiGianLamBai: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.examForm.valid) {
      console.log('Dữ liệu kỳ thi:', this.examForm.value);
    }
  }
}
