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

  getMessages(chatId: string) {
    return this.http.get(this.apiUrl + "messages/" + chatId, {withCredentials: true});
  }

  createMessage(chatId: string, content: string) {
    return this.http.post(this.apiUrl + "messages/create", {chatId, content}, {withCredentials: true});
  }

}
