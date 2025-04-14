import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamSessionService {

  private baseUrl = 'http://localhost:8081/api/exam-session';

  constructor(private http: HttpClient) {
  }

  getExamSession(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/get/all/exam-session/by-teacherId`, {headers, observe: 'response'});
  }

  createNewExamSession(examSession: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/add/exam-session`, examSession, {headers, observe: 'response'});
  }

  getExamSessionInfoById(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/get/exam-session-info/${id}`, {headers, observe: 'response'});
  }

  updateExamSessionInfoById(id: number, examSession: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/update/exam-session-info/${id}`, examSession, {headers, observe: 'response'});
  }

  checkPassword(password: String, examSessionId: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/check-password/${examSessionId}`, password, { observe: 'response'});
  }
}
