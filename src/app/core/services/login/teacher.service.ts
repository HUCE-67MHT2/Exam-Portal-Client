import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseurl = 'http://localhost:8081/api/auth/login/teacher';

  constructor(private http: HttpClient) {
  }

  loginTeacher(teacher: any): Observable<any> {
    return this.http.post(`${this.baseurl}`, teacher, {observe: 'response'});
  }
}
