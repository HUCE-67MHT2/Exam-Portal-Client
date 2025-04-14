import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExamService {
  private baseUrl = "http://localhost:8081/api/exam";

  constructor(private http: HttpClient) {
  }

  uploadExamWithFile(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add/exam/with/file`, formData);
  }

  getExams(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/get/list/exams/by/sessionId/${id}`,
      {observe: "response"}
    );
  }

  getExamById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/exam/${id}`);
  }

  // Cập nhật bài thi (có thể có file hoặc không)
  updateExam(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/update/exam`, formData);
  }

  sendExamData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/send/exam/data`, data);
  }
}
