import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetExamResultBySessionIdServiceService {

  private baseUrl = 'http://localhost:8081/api/exam-result';

  constructor(private http: HttpClient) {
  }
  getExamResultById(id: number) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/get/list/student/result/in/session/${id}`, {headers, observe: 'response'});
  }
}
