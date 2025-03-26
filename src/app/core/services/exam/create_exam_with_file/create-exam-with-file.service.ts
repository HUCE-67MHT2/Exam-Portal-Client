import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateExamWithFileService {
  private baseURL = 'http://localhost:8081/api/exam/add/exam/with/file'; // Cập nhật URL API của bạn

  constructor(private http: HttpClient) {}

  // Hàm để gửi yêu cầu POST với file và dữ liệu
  addExamWithFile(formData: FormData, id : number): Observable<any> {
    // Gửi POST request với form data
    return this.http.post(`${this.baseURL}/${id}`, formData, { observe: 'response' });
  }
}
