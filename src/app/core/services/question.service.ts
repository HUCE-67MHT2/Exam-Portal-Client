import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  private baseUrl = "http://localhost:8081/api/question";

  constructor(private http: HttpClient) {
  }

  sendQuestionData(questionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/question`, questionData);
  }

  getQuestionsByExamSessionId(sessionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/question/by/exam/session/id/${sessionId}`);
  }
}
