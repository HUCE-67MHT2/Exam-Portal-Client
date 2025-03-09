import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  authStatus = this.isAuthenticated.asObservable();

  constructor(private router: Router, private apiService: ApiService) {
  }

  login(credentials: { contact: string; password: string }) {
    this.apiService.post('login', credentials).subscribe(
        (response: any) => {
        console.log('User logged in:', response);
        this.isAuthenticated.next(true);
        this.router.navigate(['/home/student']).then(r => console.log('Navigate to layout:', r));
      },
        (error: any) => {
        console.error('Login failed:', error);
        this.isAuthenticated.next(false);
      }
    );
  }
  logout() {
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']).then(r => console.log('Navigate to login:', r));
  }
}
