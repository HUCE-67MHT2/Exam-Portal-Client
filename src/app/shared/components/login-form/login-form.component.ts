import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {LoadingComponent} from '../../../layout/loading/loading.component';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgOptimizedImage, NgIf, LoadingComponent]
})
export class LoginFormComponent {
  @Input() link: string = '';
  @Output() registerLinkClick = new EventEmitter<void>();
  @Output() userTypeChange = new EventEmitter<void>();
  @Input() onLogin!: (user: any) => void;
  loginForm: FormGroup;
  loginError: string | null = null;
  loading: boolean = false;
  @Output() loadingChange = new EventEmitter<boolean>();


  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      contact: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit = () => {
    if (this.loginForm.valid) {
      this.loadingChange.emit(true); // Bật loading trước khi gửi request

      const loginRequest = this.loginForm.value;
      if (this.onLogin) {
        this.onLogin({
          username: loginRequest.contact,
          password: loginRequest.password,
          callback: (success: boolean) => {
            this.loadingChange.emit(false); // Tắt loading khi có phản hồi
          }
        });
      }
    }
  }

  navigateToLink() {
    this.userTypeChange.emit();
  }
}
