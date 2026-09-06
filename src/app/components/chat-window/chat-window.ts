import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-chat-window',
  styleUrl: './chat-window.css',
  templateUrl: './chat-window.html',
})
export class ChatWindow {

  chat = input<any>();

  back = output<void>();

  goBack() {
    this.back.emit();
  }
}
