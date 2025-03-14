import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-exam-created-detail',
  imports: [],
  templateUrl: './exam-created-detail.component.html',
  styleUrl: './exam-created-detail.component.scss'
})
export class ExamCreatedDetailComponent implements OnInit {
  examCode: string = 'Mã không xác định'; // Đặt giá trị mặc định để kiểm tra lỗi
  examName: string = 'Tên không xác định'; // Đặt giá trị mặc định để kiểm tra lỗi
  examPassword: string = 'Mật khẩu không xác định'; // Đặt giá trị mặc định để kiểm tra lỗi
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('examCode');
    if (param) {
      this.examCode = param;
    }
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.examName = params['name'];
      }
      if (params['password']) {
        this.examPassword = params['password'];
      }
    });
  }
}
