import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginFormComponent} from '../../../shared/components/login-form/login-form.component';

@Component({
  selector: 'app-login-teacher',
  templateUrl: './teacher-login.component.html',
  standalone: true,
  imports: [LoginFormComponent]
})
export class TeacherLoginComponent {
  constructor(private router: Router) {
  }

  onUserTypeChange() {
    this.router.navigate(['/login/student'])
      .then(() => console.log('Chuyển sang đăng nhập học sinh'));
  }
}
