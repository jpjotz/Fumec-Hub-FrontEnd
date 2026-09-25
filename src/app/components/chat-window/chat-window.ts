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
  typing = signal(false);
  private typingTimeout: any;
  constructor(private webSocketService: WebSocketService) {
    this.typing = this.webSocketService.typing;
    this.onlineUsers = this.webSocketService.onlineUsers;

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

      this.isOtherUserOnline.set(this.onlineUsers().includes(this.chat().otherUser.id));

      setTimeout(() => {
        const container = this.messagesContainer();

        if (container) {
          container.nativeElement.scrollTop = container.nativeElement.scrollHeight;
        }
      });
    });
  }

  messagesContainer = viewChild<ElementRef>('messagesContainer');
  chat = input<any>();
  back = output<void>();
  user = input<any>();
  messages = signal<any[]>([]);
  message = signal('');
  messageInput = viewChild<ElementRef>('messageInput');
  onlineUsers = signal<string[]>([]);
  isOtherUserOnline = signal(false);

  goBack() {
    this.back.emit();
    this.webSocketService.leaveChat();
  }

  sendMessage() {
    if (!this.message().trim()) {
      return;
    }

    this.webSocketService.sendMessage(this.chat().id, this.message());
    this.webSocketService.sendStopTyping(this.chat().id);

    this.message.set('');
  }

  sendTyping() {
    this.webSocketService.sendTyping(this.chat().id);

    clearTimeout(this.typingTimeout);

    this.typingTimeout = setTimeout(() => {
      this.webSocketService.sendStopTyping(this.chat().id);
    }, 1000)
  }

  ngOnInit() {
    this.webSocketService.connect(this.chat().id);
  }
}
