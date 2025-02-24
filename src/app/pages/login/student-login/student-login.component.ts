import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginFormComponent} from '../../../shared/components/login-form/login-form.component';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login-student',
  templateUrl: './student-login.component.html',
  standalone: true,
  imports: [LoginFormComponent]
})
export class StudentLoginComponent {
  loginForm: FormGroup | any;

  constructor(private router: Router) {
  }

  onUserTypeChange() {
    this.router.navigate(['/login/teacher'])
      .then(() => console.log('Chuyển sang đăng nhập giáo viên'));
  }
}
