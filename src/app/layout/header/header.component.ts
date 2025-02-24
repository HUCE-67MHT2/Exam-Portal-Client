import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink]
})
export class HeaderComponent {
  constructor(private router: Router) {
  }

  onRegister() {
    this.router.navigate(['/sign_up/student']).then(() => console.log('Chuyển đến trang đăng ký học sinh'));
  }
}
