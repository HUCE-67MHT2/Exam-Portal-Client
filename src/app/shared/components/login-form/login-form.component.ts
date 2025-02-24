import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgOptimizedImage, NgIf]
})
export class LoginFormComponent {
  @Input() link: string = '';
  @Output() userTypeChange = new EventEmitter<void>();
  @Output() registerLinkClick = new EventEmitter<void>();

  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      contact: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const {contact, password} = this.loginForm.value;

      if (contact === 'student@example.com' && password === '123456') {
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = 'Thông tin đăng nhập không chính xác!';
      }
    }
  }

  navigateToLink() {
    this.userTypeChange.emit();
  }
}
