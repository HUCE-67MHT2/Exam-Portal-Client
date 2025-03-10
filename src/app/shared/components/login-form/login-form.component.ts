import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { Router, RouterLink } from '@angular/router';
  import { NgIf, NgOptimizedImage } from '@angular/common';
  import { AuthService } from '../../../core/services/auth.service';

  @Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, NgOptimizedImage, NgIf]
  })
  export class LoginFormComponent {
    @Input() link: string = '';
    @Output() registerLinkClick = new EventEmitter<void>();
    @Output() userTypeChange = new EventEmitter<void>();
    @Input() onLogin!: (user: any) => void;
    loginForm: FormGroup;
    loginError: string | null = null;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
      this.loginForm = this.fb.group({
        contact: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

    onSubmit = ()=> {
      if (this.loginForm.valid) {
        const loginRequest = this.loginForm.value;
        if(this.onLogin) {
          this.onLogin({username: loginRequest.contact, password: loginRequest.password});
        }
      }
    }

    navigateToLink() {
      this.userTypeChange.emit();
    }
  }
