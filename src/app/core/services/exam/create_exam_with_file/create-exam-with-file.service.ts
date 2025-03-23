import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateExamWithFileService {
  private baseURL = 'http://localhost:8081/api/exam/add/exam/with/file'; // Cập nhật URL API của bạn

  constructor(private http: HttpClient) {}

  // Hàm để gửi yêu cầu POST với file và dữ liệu
  addExamWithFile(formData: FormData): Observable<any> {
    // Lấy token từ LocalStorage (hoặc từ nơi bạn lưu trữ token)
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Gửi POST request với form data
    return this.http.post(this.baseURL, formData, { headers, observe: 'response' });
  }
}
