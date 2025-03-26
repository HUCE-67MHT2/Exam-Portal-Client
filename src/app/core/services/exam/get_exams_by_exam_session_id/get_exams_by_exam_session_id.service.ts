import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetExamsBySessionIDService {
  private apiUrl = 'http://localhost:8081/api/exam/get/list/exams/by/sessionId'; // Updated URL

  constructor(private http: HttpClient) {
  }

  getExams(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {observe: 'response'});
  }
}
