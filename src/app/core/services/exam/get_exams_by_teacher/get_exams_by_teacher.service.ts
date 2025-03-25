import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Exam } from '../../../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class GetExamsByTeacherService {
  private apiUrl = 'http://localhost:8081/api/exam/get/list/exams'; // Ensure this matches your backend endpoint

  constructor(private http: HttpClient) {}

  getExams(): Observable<Exam[]> {
    const token = localStorage.getItem('authToken'); // Adjust this to where you store the token
    if (!token) {
      return throwError('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Exam[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
