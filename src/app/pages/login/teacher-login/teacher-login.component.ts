import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginFormComponent} from '../../../shared/components/login-form/login-form.component';
import {TeacherService} from '../../../core/services/login/teacher.service';
import {ToastrService} from 'ngx-toastr';
import {LoadingComponent} from '../../../layout/loading/loading.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login-teacher',
  templateUrl: './teacher-login.component.html',
  standalone: true,
  imports: [LoginFormComponent, LoadingComponent, NgIf],
  providers: [TeacherService]
})
export class TeacherLoginComponent {
  loading: boolean = false;

  constructor(private router: Router, private teacherService: TeacherService, private toastr: ToastrService) {
  }


  onUserTypeChange() {
    this.router.navigate(['/login/student'])
      .then(() => console.log('Chuyển sang đăng nhập học sinh'));
  }

  onLoginTeacher = (teacher: any) => {
    this.loading = true;
    this.teacherService.loginTeacher(teacher).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Phản hồi từ server:', response);
        if (response.status === 200) {
          this.toastr.success('Đăng nhập thành công', 'Thành công', {timeOut: 2000});
          localStorage.setItem('authToken', response.body.token);
          setTimeout(() => {
            this.router.navigate(['/home/teacher']);
          }, 2000);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Lỗi khi đăng nhập:', error);
        this.toastr.error(error.error.message, 'Lỗi', {timeOut: 2000});
      }
    });
  }
}
