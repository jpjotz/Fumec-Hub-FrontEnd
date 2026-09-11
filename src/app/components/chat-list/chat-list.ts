import { Component, signal, output, input } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { ChatItem } from '../chat-item/chat-item';
import { Router } from '@angular/router';
import { AddFriend } from '../add-friend/add-friend';
import { FriendRequests } from '../friend-requests/friend-requests';
import { Modal } from '../shared/modal/modal';
import { AuthService } from '../../core/services/auth.service';
import { WebSocketService } from '../../core/services/websocket.service';

@Component({
  imports: [ChatItem, AddFriend, FriendRequests, Modal],
  selector: 'app-chat-list',
  styleUrl: './chat-list.css',
  templateUrl: './chat-list.html',
})
export class ChatList {
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private webSocketService: WebSocketService,
    private router: Router,
  ) {}

  chats = signal<any[]>([]);
  user = input<any>();

  friendsView = signal('add');
  showFriends = signal(false);

  openChatSelected = output<any>();

  openChat(chat: any) {
    this.openChatSelected.emit(chat)
  }

  ngOnInit() {

    this.webSocketService.connect();

    this.chatService.getChats().subscribe({
      next: (data: any) => {
        this.chats.set(data.chats);
      },
    });

  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
