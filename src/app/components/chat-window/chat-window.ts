import {
  Component,
  input,
  output,
  signal,
  viewChild,
  ElementRef,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../core/services/chat.service';

@Component({
  imports: [FormsModule],
  selector: 'app-chat-window',
  styleUrl: './chat-window.css',
  templateUrl: './chat-window.html',
})
export class ChatWindow {
  constructor(private chatService: ChatService) {
    effect(() => {
      const chat = this.chat();

      if (chat) {
        this.loadMessages(chat.id);
      }
    });
  }

  chat = input<any>();
  user = input<any>();
  back = output<void>();

  messages = signal<any[]>([]);
  message = signal('');
  typing = signal(false);
  isOtherUserOnline = signal(false);

  messagesContainer = viewChild<ElementRef>('messagesContainer');
  messageInput = viewChild<ElementRef>('messageInput');

  loadMessages(chatId: string) {
    this.chatService.getMessages(chatId).subscribe((messages: any) => {
      this.messages.set(
        messages.map((message: any) => ({
          text: message.content,
          type: message.senderId === 'current-user' ? 'sent' : 'received',
        })),
      );
    });
  }

  goBack() {
    this.back.emit();
  }

  sendMessage() {
    if (!this.message().trim()) return;

    this.chatService.createMessage(this.chat().id, this.message()).subscribe(() => {
      this.message.set('');
      this.loadMessages(this.chat().id);
    });
  }

  sendTyping() {}
}
