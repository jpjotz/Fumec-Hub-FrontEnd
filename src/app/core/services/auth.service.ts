import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor (private http: HttpClient) {}

  private apiUrl = 'https://fumec-hub-backend.onrender.com/';

  user = signal<any>(null);

  getMe() {
    return this.http.get(this.apiUrl + 'users/me', {withCredentials: true}).pipe(
      tap((user) => {
        this.user.set(user);
      })
    );
  }

  register(nome: string, email: string, password: string) {
    return this.http.post(this.apiUrl + 'users/register', {name: nome, email, password}, {withCredentials: true});
  }

  login(email: string, password: string) {
    return this.http.post(this.apiUrl + 'auth/login', {email, password}, {withCredentials: true});
  }

  refresh() {
    return this.http.post(this.apiUrl + 'auth/refresh', {}, {withCredentials: true})
  }

  logout() {
    return this.http.post(this.apiUrl + 'auth/logout', {}, {withCredentials: true})
  }
}
