import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateExamWithFileService {

  private baseURL = 'http://localhost:8081/api/exam/add/exam/with/file'; // Cập nhật URL API của bạn

  constructor(private http: HttpClient) {
  }

  // Hàm để gửi yêu cầu POST với file và dữ liệu
  addExamWithFile(
    tenKyThi: string,
    loaiDeThi: string,
    maDeThi: string,
    thoiGianLamBai: number,
    maKyThi: string,
    matKhauKyThi: string,
    answers: any,
    file: File,
    thoiGianBatDau: string,
    thoiGianKetThuc: string
  ): Observable<any> {
    // Lấy token từ LocalStorage (hoặc từ nơi bạn lưu trữ token)
    const token = localStorage.getItem('authToken');

    // Cấu hình header với token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Tạo form data để gửi file và các tham số
    const formData = new FormData();
    formData.append('tenKyThi', tenKyThi);
    formData.append('loaiDeThi', loaiDeThi);
    formData.append('maDeThi', maDeThi);
    formData.append('thoiGianLamBai', thoiGianLamBai.toString());
    formData.append('maKyThi', maKyThi);
    formData.append('matKhauKyThi', matKhauKyThi);
    formData.append('file', file);
    formData.append('answer', answers);
    formData.append('thoiGianBatDau', thoiGianBatDau);
    formData.append('thoiGianKetThuc', thoiGianKetThuc);

    // Gửi POST request với form data
    return this.http.post(`${this.baseURL}`, formData, {headers, observe: 'response'});
  }
}
