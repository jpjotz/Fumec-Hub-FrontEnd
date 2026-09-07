import { Component, input, output, signal, effect, viewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../../core/services/websocket.service';

@Component({
  imports: [FormsModule],
  selector: 'app-chat-window',
  styleUrl: './chat-window.css',
  templateUrl: './chat-window.html',
})
export class ChatWindow {
  constructor(private webSocketService: WebSocketService) {
    effect(() => {
      const messages = this.webSocketService.messages();
      const user = this.user();

      if (!user) {
        return;
      }

      this.messages.set(
        messages.map((message: any) => ({
          text: message.content,
          type: message.senderId === user.id ? 'sent' : 'received',
        })),
      );

      setTimeout(() => {
        const container = this.messagesContainer();

        if(container) {
          container.nativeElement.scrollTop = container.nativeElement.scrollHeight;
        }
      })
    });
  }

  messagesContainer = viewChild<ElementRef>('messagesContainer');

  chat = input<any>();

  back = output<void>();

  user = input<any>();

  messages = signal<any[]>([]);

  message = signal('');

  goBack() {
    this.back.emit();
  }

  sendMessage() {
    if (!this.message().trim()) {
      return;
    }

    this.webSocketService.sendMessage(this.chat().id, this.message());

    this.message.set('');

    (event?.target as HTMLInputElement)?.blur();
  }

  ngOnInit() {
    this.webSocketService.connect(this.chat().id);
  }
}
