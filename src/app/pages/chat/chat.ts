import { Component, signal } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { ChatList } from '../../components/chat-list/chat-list';
import { ChatWindow } from '../../components/chat-window/chat-window';

@Component({
  imports: [ChatList, ChatWindow],
  selector: 'app-chat',
  styleUrl: './chat.css',
  templateUrl: './chat.html',
})
export class Chat {

  selectedChat = signal<any>(null);

}
