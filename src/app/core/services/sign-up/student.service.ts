import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:8081/api/auth/register/student';

  constructor(private http: HttpClient) {
  }

  registerStudent(student: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, student, {observe: 'response'});
  }
}
