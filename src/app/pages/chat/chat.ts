import { Component } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';

@Component({
  imports: [],
  selector: 'app-chat',
  styleUrl: './chat.css',
  templateUrl: './chat.html',
})
export class Chat {
  constructor (private chatService: ChatService) {}
  chats: any[] = [];

  ngOnInit() {
    this.chatService.getChats().subscribe({
      next: (data: any) => {
        this.chats = data.chats;
      }
    })
  }
}
