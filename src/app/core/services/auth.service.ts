import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  authStatus = this.isAuthenticated.asObservable();

  constructor(private router: Router) {
  }

  login(credentials: { contact: string; password: string }) {
    // TODO: Thêm logic xác thực thực tế
    console.log('User logged in:', credentials);
    this.isAuthenticated.next(true);
    this.router.navigate(['/layout']).then(r => console.log('Navigate to layout:', r));
  }

  logout() {
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']).then(r => console.log('Navigate to login:', r));
  }
}
