import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam } from '../../../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class GetExamsByTeacherService {
  private apiUrl = 'http://localhost:8081/api/get/list/exams'; // API backend

  constructor(private http: HttpClient) {}

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.apiUrl);
  }
}
