import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamSessionEnrollmentService {

  private baseUrl = 'http://localhost:8081/api/exam-session-enrollment';

  constructor(private http: HttpClient) {
  }

  getExamSessionEnrollmentsById(id: number) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/get/list/student/in/sessionId/${id}`, {headers, observe: 'response'});
  }

  getExamSessionEnrollmentsByStudentToken() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/get/exam-session-by-studentId`, {headers, observe: 'response'});
  }

  joinExamSession(code: string) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/join/exam-session/${code}`, null, {headers, observe: 'response'});
  }
}
