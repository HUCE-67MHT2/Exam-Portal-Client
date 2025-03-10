import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TeahcerService {

  private baseUrl = 'http://localhost:8081/api/auth/register/teacher';
  constructor(private http: HttpClient) { }

  registerTeacher(teacher: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, teacher, { observe: 'response' });
  }
}
