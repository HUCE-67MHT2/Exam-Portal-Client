import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateExamWithFileService {
  private baseURL = 'http://localhost:8081/api/exam/add/exam/with/file';

  constructor(private http: HttpClient) {}

  uploadExamWithFile(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseURL, formData);
  }
}
