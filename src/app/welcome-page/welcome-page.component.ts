import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
  selectedRole: string = 'Tôi là học sinh';

  constructor(private router: Router) {}

  onContinue() {
    if (this.selectedRole === 'Tôi là học sinh') {
      this.router.navigate(['/login/student']);
    } else if (this.selectedRole === 'Tôi là giáo viên') {
      this.router.navigate(['/login/teacher']);
    }
  }

  onRegister() {
    if (this.selectedRole === 'Tôi là học sinh') {
      this.router.navigate(['/sign_up/student']);
    } else if (this.selectedRole === 'Tôi là giáo viên') {
      this.router.navigate(['/sign_up/teacher']);
    }
  }
}
