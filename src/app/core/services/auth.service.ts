import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor (private http: HttpClient) {}

  private apiUrl = 'https://fumec-hub-backend.onrender.com/';

  login(email: string, password: string) {
    return this.http.post(this.apiUrl + 'auth/login', {email, password}, {withCredentials: true});
  }
}
