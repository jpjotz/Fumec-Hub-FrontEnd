import { Component, signal } from '@angular/core';
import { ChatList } from '../../components/chat-list/chat-list';
import { ChatWindow } from '../../components/chat-window/chat-window';
import { AuthService } from '../../core/services/auth.service';

@Component({
  imports: [ChatList, ChatWindow],
  selector: 'app-chat',
  styleUrl: './chat.css',
  templateUrl: './chat.html',
})
export class Chat {
  selectedChat = signal<any>(null);
  user = signal<any>(null)

  constructor(private authService: AuthService) {
    this.user = this.authService.user;

  }



}
