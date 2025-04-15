import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true, // 👈 Thêm dòng này
  templateUrl: './user-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./user-form.component.scss'],
  providers: [UserService]
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  @Input() onGetInfo!: () => void;
  @Input() UserInfo!: {
    user: {
      id: undefined,
      username: undefined,
      password: undefined,
      enabled: undefined,
      fullName: undefined,
      gender: undefined,
      birthday: undefined,
      address: undefined,
      email: undefined,
      telephone: undefined,
      avatarUrl: undefined,
      school: undefined,
      className: undefined,
      status: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    }
  };

  constructor(private userService: UserService) {
  }


  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      class: new FormControl('', Validators.required),
      school: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      emailOrPhone: new FormControl('', [Validators.required, Validators.email]), // Bạn có thể thêm validator cho số điện thoại nếu cần
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  saveInfo = () => {
    if (this.userForm.get('name')?.valid &&
      this.userForm.get('class')?.valid &&
      this.userForm.get('school')?.valid &&
      this.userForm.get('dob')?.valid &&
      this.userForm.get('province')?.valid) {
      const userValue = this.userForm.value;
      console.log('Thông tin cá nhân đã được lưu:', userValue);
      // Gọi API để lưu thông tin cá nhân
    } else {
      console.log('Vui lòng điền đầy đủ thông tin cá nhân.');
    }
  }

  changePassword() {
    if (this.userForm.get('currentPassword')?.valid &&
      this.userForm.get('newPassword')?.valid &&
      this.userForm.get('confirmPassword')?.valid) {
      if (this.userForm.get('newPassword')?.value === this.userForm.get('confirmPassword')?.value) {
        console.log('Đổi mật khẩu thành công:', this.userForm.value);
        // Gọi API để đổi mật khẩu
      } else {
        console.log('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      }
    } else {
      console.log('Vui lòng điền đầy đủ thông tin mật khẩu.');
    }
  }
}
