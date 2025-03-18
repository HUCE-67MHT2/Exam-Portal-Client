import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginFormComponent} from '../../../shared/components/login-form/login-form.component';
import {FormGroup} from '@angular/forms';
import {StudentService} from '../../../core/services/login/student.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login-student',
  templateUrl: './student-login.component.html',
  standalone: true,
  imports: [LoginFormComponent],
  providers: [StudentService]
})
export class StudentLoginComponent {
  loginForm: FormGroup | any;

  constructor(private router: Router, private studentService: StudentService, private toastr: ToastrService) {}


  onUserTypeChange() {
    this.router.navigate(['/login/teacher'])
      .then(() => console.log('Chuyển sang đăng nhập giáo viên'));
  }

  onLoginStudent = (student: any) => {
    this.studentService.loginStudent(student).subscribe({
      next: (response) => {
        console.log('Phản hồi từ server:', response);
        if(response.status === 200) {
          this.toastr.success('Đăng nhập thành công', 'Thành công', { timeOut: 2000 });
          localStorage.setItem('authToken', response.body.token);
          setTimeout(() => {
            this.router.navigate(['/home/student']);
          }, 2000);
        }
      },
      error: (error) => {
        console.error('Lỗi khi đăng nhập:', error);
        this.toastr.error(error.error.message, 'Lỗi', { timeOut: 2000 });
      }
    });
  }
}
