import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  private apiUrl = '/api/';

  getCourses() {
    return this.http.get<any[]>(this.apiUrl + 'courses');
  }
}
