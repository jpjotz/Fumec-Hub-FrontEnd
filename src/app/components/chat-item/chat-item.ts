import { Component, input, output } from '@angular/core';
import { WebSocketService } from '../../core/services/websocket.service';
import { ChatInterface } from '../../models/ChatInterface';

@Component({
  imports: [],
  selector: 'app-chat-item',
  styleUrl: './chat-item.css',
  templateUrl: './chat-item.html',
})
export class ChatItem {
  notifications;

  constructor(private webSocketService: WebSocketService) {
    this.notifications = this.webSocketService.notifications;
  }

  chat = input.required<ChatInterface>();

  openChat = output<ChatInterface>();

  selectChat() {
    this.webSocketService.clearNotifications(this.chat().id);
    this.openChat.emit(this.chat());
  }
}
