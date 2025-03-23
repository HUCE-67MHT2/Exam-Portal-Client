import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from '../../../../layout/header/header.component';

@Component({
  selector: 'app-create-exam-period',
  templateUrl: './create-exam-period.component.html',
  imports: [
    ReactiveFormsModule,
    HeaderComponent
  ],
  styleUrls: ['./create-exam-period.component.scss']
})
export class CreateExamPeriodComponent {
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
