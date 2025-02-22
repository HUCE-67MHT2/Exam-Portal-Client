import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  // Import trực tiếp ReactiveFormsModule
import { Router } from '@angular/router';  // Import Router để điều hướng
import { NgIf } from '@angular/common';  // Import NgIf để sử dụng *ngIf trong template

@Component({
  selector: 'app-login-teacher',
  templateUrl: './teacher.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {  // Thêm router vào constructor
    this.loginForm = this.fb.group({
      contact: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle form submission
      console.log(this.loginForm.value);
    }
  }
  onUserTypeChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'student') {
      this.router.navigate(['/login/student']);
    } else if (selectedValue === 'teacher') {
      this.router.navigate(['/login/teacher']);
    }
  }
}
