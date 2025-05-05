import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamQuestionListService {
  private baseUrl = `${environment.apiUrl}/exam/question`;

  constructor(private http: HttpClient) {}

  getQuestionsByExamId(examId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/get/question/by/examId/${examId}/default`
    );
  }
}
