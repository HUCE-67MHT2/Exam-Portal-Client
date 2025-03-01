import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor() { }

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

  saveInfo() {
    if (this.userForm.get('name')?.valid &&
      this.userForm.get('class')?.valid &&
      this.userForm.get('school')?.valid &&
      this.userForm.get('dob')?.valid &&
      this.userForm.get('province')?.valid) {
      console.log('Thông tin cá nhân đã được lưu:', this.userForm.value);
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
