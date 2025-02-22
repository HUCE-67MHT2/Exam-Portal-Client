import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  // Import trực tiếp ReactiveFormsModule
import { Router } from '@angular/router';  // Import Router để điều hướng
import { NgIf } from '@angular/common';  // Import NgIf để sử dụng *ngIf trong template

@Component({
  selector: 'app-login-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  imports: [
    ReactiveFormsModule,  // Đảm bảo import ReactiveFormsModule
    NgIf  // Import NgIf để sử dụng *ngIf trong template
  ]
})
export class StudentComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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
