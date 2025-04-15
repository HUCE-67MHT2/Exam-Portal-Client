import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StudentAnswerService {
  private baseUrl = "http://localhost:8081/api/student-answer";

  constructor(private http: HttpClient) {
  }

  saveUploadStudentAnswers(examId: number, answers: { [questionNo: number]: string }): Observable<any> {
    const payload = {
      examId,
      answers
    };
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/upload/save`, payload, { headers });
  }
}
