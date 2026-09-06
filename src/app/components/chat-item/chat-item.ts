import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-chat-item',
  styleUrl: './chat-item.css',
  templateUrl: './chat-item.html',
})
export class ChatItem {
  chat = input<any>();

  openChat = output<any>();

  selectChat() {
    this.openChat.emit(this.chat());
  }
}
