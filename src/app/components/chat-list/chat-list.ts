import { Component, signal } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { ChatItem } from '../chat-item/chat-item';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [ChatItem],
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
