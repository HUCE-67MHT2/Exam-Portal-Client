import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// Giữ nguyên các import khác nếu có

@Injectable({
  providedIn: 'root'
})
export class CreateExamWithFileService {
  // URL endpoint backend (không thay đổi)
  private baseURL = 'http://localhost:8081/api/exam/add/exam/with/file';

  constructor(private http: HttpClient) {}

  uploadExamWithFile(formData: FormData): Observable<HttpResponse<any>> {
    // Không set header Content-Type, để browser tự thiết lập boundary cho multipart/form-data
    return this.http.post<HttpResponse<any>>(this.baseURL, formData, {
      observe: 'response'
    });
  }
}
