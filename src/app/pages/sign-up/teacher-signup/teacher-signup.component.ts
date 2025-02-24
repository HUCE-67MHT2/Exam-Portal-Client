import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SignupFormComponent} from '../../../shared/components/signup-form/signup-form.component';

@Component({
  selector: 'app-signup-teacher',
  templateUrl: './teacher-signup.component.html',
  standalone: true,
  imports: [SignupFormComponent]
})
export class TeacherSignupComponent {
  constructor(private router: Router) {
  }
}
