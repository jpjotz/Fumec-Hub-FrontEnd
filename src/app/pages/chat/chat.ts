import { Component, signal } from '@angular/core';
import { ChatList } from '../../components/chat-list/chat-list';
import { ChatWindow } from '../../components/chat-window/chat-window';
import { AuthService } from '../../core/services/auth.service';
import { Location } from '@angular/common';

@Component({
  imports: [ChatList, ChatWindow],
  selector: 'app-chat',
  styleUrl: './chat.css',
  templateUrl: './chat.html',
})
export class Chat {
  selectedChat = signal<any>(null);
  user = signal<any>(null);

  constructor(
    private authService: AuthService,
    private location: Location,
  ) {
    this.user = this.authService.user;

    this.location.subscribe(() => {
      if (this.selectedChat()) {
        this.selectedChat.set(null);
      }
    });
  }

  openChat(chat: any) {
    this.location.go(this.location.path());
    this.selectedChat.set(chat);
  }

  goBack() {
    this.location.back();
  }
}
