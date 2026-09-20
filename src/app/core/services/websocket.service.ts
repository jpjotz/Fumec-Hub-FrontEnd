import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private authService = inject(AuthService);
  private socket!: WebSocket;

  messages = signal<any[]>([]);
  notifications = signal<any[]>([]);
  friendRequestReceived = signal(0);

  connect(chatId?: string) {
    this.messages.set([]);

    const currentUser = this.authService.user();
    const userId = currentUser?.id || currentUser?._id;

    if (!userId) {
      console.warn('Usuário não autenticado no AuthService. Conexão do WS cancelada.');
      return;
    }

    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {

      this.socket = new WebSocket(`wss://fumec-hub-backend.onrender.com?userId=${userId}`);

      this.socket.onopen = () => {
        console.log('WebSocket conectado!');
        if (chatId) {
          this.joinChat(chatId);
        }
      };

      this.socket.onclose = () => {
        console.log('WebSocket desconectado!');
      };

      this.socket.onerror = (error) => {
        console.error('Erro no WebSocket: ', error);
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (Array.isArray(data)) {
          this.messages.set(data);
          return;
        }

        if (data.event === 'newMessage') {
          this.messages.update((messages) => [...messages, data]);
        }

        if (data.event === 'newMessageNotification') {
          this.notifications.update((notifications) => [...notifications, data]);
        }

        if(data.event === 'friendRequest') {
          this.notifications.update((notifications) => [...notifications, data]);
          this.friendRequestReceived.update((count) => count + 1);
        }
      };
    } else if (this.socket.readyState === WebSocket.OPEN && chatId) {
      this.joinChat(chatId);
    }
  }

  joinChat(chatId: string) {
    this.safeSend({ event: 'joinChat', chatId });
  }

  sendMessage(chatId: string, content: string) {
    this.safeSend({ event: 'sendMessage', chatId, content });
  }

  leaveChat() {
    this.safeSend({ event: 'leaveChat' });
  }

  clearNotifications(chatId: string) {
    this.notifications.update((notifications) => notifications.filter((n) => n.chatId !== chatId));
  }

  private safeSend(payload: object) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(payload));
    }
  }
}
