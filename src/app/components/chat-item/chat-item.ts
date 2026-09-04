import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-chat-item',
  styleUrl: './chat-item.css',
  templateUrl: './chat-item.html',
})
export class ChatItem {
  chat = input<any>();
}
