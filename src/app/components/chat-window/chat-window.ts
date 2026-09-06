import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../core/services/chat.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  imports: [FormsModule],
  selector: 'app-chat-window',
  styleUrl: './chat-window.css',
  templateUrl: './chat-window.html',
})
export class ChatWindow {
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
  ) {}

  chat = input<any>();

  back = output<void>();

  user = signal<any>(null);

  messages = signal<any[]>([]);

  message = signal('');

  goBack() {
    this.back.emit();
  }

  sendMessage() {
    if (!this.message().trim()) {
      return;
    }

    this.chatService.createMessage(this.chat().id, this.message()).subscribe({
      next: (message: any) => {
        this.messages.update((messages) => [...messages, { text: message.content, type: 'sent' }]);
        this.message.set('');
      },
    });
  }

  ngOnInit() {
    this.authService.getMe().subscribe({
      next: (user: any) => {
        this.user.set(user);

        this.chatService.getMessages(this.chat().id).subscribe({
          next: (messages: any) => {

            this.messages.set(
              messages.map((message: any) => ({
                text: message.content,
                type: message.senderId === this.user().id ? 'sent' : 'received',
              })),
            );
          },
        });
      },
    });
  }
}
