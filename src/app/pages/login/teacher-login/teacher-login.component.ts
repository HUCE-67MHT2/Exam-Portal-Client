import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginFormComponent} from '../../../shared/components/login-form/login-form.component';
import {TeacherService} from '../../../core/services/login/teacher.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login-teacher',
  templateUrl: './teacher-login.component.html',
  standalone: true,
  imports: [LoginFormComponent],
  providers: [TeacherService]
})
export class TeacherLoginComponent {
  constructor(private router: Router, private teacherService: TeacherService, private toastr: ToastrService) {}


  onUserTypeChange() {
    this.router.navigate(['/login/student'])
      .then(() => console.log('Chuyển sang đăng nhập học sinh'));
  }
  onLoginTeacher = (teacher: any) => {
    this.teacherService.loginTeacher(teacher).subscribe({
      next: (response) => {
        console.log('Phản hồi từ server:', response);
        if(response.status === 200) {
          this.toastr.success('Đăng nhập thành công', 'Thành công', { timeOut: 2000 });

          setTimeout(() => {
            this.router.navigate(['/home/teacher']);
          }, 2000);
        }
      },
      error: (error) => {
        console.error('Lỗi khi đăng nhập:', error);
        this.toastr.error(error.error.message, 'Lỗi', { timeOut: 2000 });
  }}); }
}
