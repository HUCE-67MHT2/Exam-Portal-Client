import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExamSessionService {

  private baseUrl = 'http://localhost:8081/api/exam-session';
  constructor(private http: HttpClient) { }

  getExamSession(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/get/all/exam-period`, { headers, observe: 'response' });
  }
  createNewExamSession(examSession: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/add/exam-period`, examSession, { headers, observe: 'response' });
  }
}
