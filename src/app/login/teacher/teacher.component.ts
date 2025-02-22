import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  // Import trực tiếp ReactiveFormsModule
import {Router, RouterLink} from '@angular/router';  // Import Router để điều hướng
import {NgIf, NgOptimizedImage} from '@angular/common';  // Import NgIf để sử dụng *ngIf trong template

@Component({
  selector: 'app-login-teacher',
  templateUrl: './teacher.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    NgOptimizedImage
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
  onUserTypeChange() {
    this.router.navigate(['/login/student']);
  }
}
