import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  constructor (private http: HttpClient) {}

  private apiUrl = 'https://fumec-hub-backend.onrender.com/';

  getChats() {
    return this.http.get(this.apiUrl + 'chats', {withCredentials: true});
  }

}
