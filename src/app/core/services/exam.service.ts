import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExamStateResponse} from '../models/exam-upload-state.model';

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

  sendExamManuallyData(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add/exam/manually`, formData);
  }

  getTestState(examId: number) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ExamStateResponse>(`${this.baseUrl}/get/test/state/upload/exam/${examId}`, {}, { headers });
  }

  submitUploadExam(examId: number) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ExamStateResponse>(`${this.baseUrl}/upload/submit/${examId}`, {}, {headers});
  }
}
