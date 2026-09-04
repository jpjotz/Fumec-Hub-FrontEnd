import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor (private http: HttpClient) {}

  private apiUrl = 'https://fumec-hub-backend.onrender.com/';

  getMe() {
    return this.http.get(this.apiUrl + 'users/me', {withCredentials: true});
  }

  register(nome: string, email: string, password: string) {
    return this.http.post(this.apiUrl + 'users/register', {name: nome, email, password}, {withCredentials: true});
  }

  login(email: string, password: string) {
    return this.http.post(this.apiUrl + 'auth/login', {email, password}, {withCredentials: true});
  }

  logout() {
    return this.http.post(this.apiUrl + 'auth/logout', {})
  }
}
