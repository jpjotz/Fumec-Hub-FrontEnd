import { Component, input, output, signal, effect, viewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../../core/services/websocket.service';

import { ChatInterface } from '../../models/ChatInterface';
import { UserInterface } from '../../models/UserInterface';
import { MessageInterface } from '../../models/MessageInterface';
import { FriendshipService } from '../../core/services/friendship.service';

@Component({
  imports: [FormsModule],
  selector: 'app-chat-window',
  styleUrl: './chat-window.css',
  templateUrl: './chat-window.html',
})
export class ChatWindow {
  typing = signal(false);
  private typingTimeout: any;
  constructor(
    private webSocketService: WebSocketService,
    private friendshipService: FriendshipService,
  ) {
    this.typing = this.webSocketService.typing;
    this.onlineUsers = this.webSocketService.onlineUsers;

    effect(() => {
      const messages = this.webSocketService.messages();
      const user = this.user();

      if (!user) {
        return;
      }

      this.messages.set(
        messages.map((message: MessageInterface) => ({
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
  chat = input.required<ChatInterface>();
  back = output<string>();
  user = input.required<UserInterface>();
  messages = signal<any[]>([]);
  message = signal('');
  messageInput = viewChild<ElementRef>('messageInput');
  onlineUsers = signal<string[]>([]);
  isOtherUserOnline = signal(false);

  showChatMenu = signal(false);

  goBack() {
    this.back.emit(this.chat().friendshipId);
    // this.webSocketService.leaveChat();
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
    }, 1000);
  }

  deleteFriendship() {
    this.friendshipService.deleteFriendship(this.chat().friendshipId).subscribe({
      next: () => {
        this.back.emit(this.chat().friendshipId);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit() {
    this.webSocketService.connect(this.chat().id);
  }
}
