import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signup-teacher',
  templateUrl: './student.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      class: ['', Validators.required],
      school: ['', Validators.required],
      dob: ['', Validators.required],
      province: ['', Validators.required],
      contact: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
      // TODO: Gửi dữ liệu đến backend hoặc xử lý tiếp
    } else {
      console.log('Form không hợp lệ');
    }
  }
}

