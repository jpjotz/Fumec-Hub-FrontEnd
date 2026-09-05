import { Component, signal } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { ChatItem } from '../chat-item/chat-item';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { AddFriend } from '../add-friend/add-friend';
import { FriendRequests } from '../friend-requests/friend-requests';

@Component({
  imports: [ChatItem, AddFriend, FriendRequests],
  selector: 'app-chat-list',
  styleUrl: './chat-list.css',
  templateUrl: './chat-list.html',
})
export class ChatList {
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router,
  ) {}

  chats = signal<any[]>([]);
  user = signal<any>(null);

  showAddFriend = signal(false);
  viewRequests = signal(false);

  ngOnInit() {
    this.chatService.getChats().subscribe({
      next: (data: any) => {
        this.chats.set(data.chats);
      },
    });

    this.authService.getMe().subscribe({
      next: (data: any) => {
        console.log('USUARIO:', data)
        this.user.set(data);
      },
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
