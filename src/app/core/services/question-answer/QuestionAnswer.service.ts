// exam-session-answer.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionAnswerService {
  private baseUrl = 'http://localhost:8081/api/question-answer';

  constructor(private http: HttpClient) {
  }

  uploadQuestionAnswers(examId: number, answers: { [key: number]: string }): Observable<any> {
    const payload = {
      examId,
      answers,
    };
    return this.http.post(`${this.baseUrl}/upload`, payload);
  }

  getUploadQuestionAnswers(examId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/upload`, {params: {examId: examId}});
  }

  updateQuestionAnswers(examId: number, answers: { [key: number]: string }): Observable<any> {
    const payload = {
      examId,
      answers,
    };
    return this.http.post(`${this.baseUrl}/update`, payload);
  }
}
