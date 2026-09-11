import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from './auth.service'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private authService = inject(AuthService);
  private socket!: WebSocket;

  messages = signal<any[]>([]);
  notifications = signal<any[]>([]);

  connect(chatId?: string) {
    this.messages.set([]);

    // Pega o id do usuário logado através do Signal do AuthService
    const currentUser = this.authService.user();
    const userId = currentUser?.id || currentUser?._id;

    if (!userId) {
      console.warn('Usuário não autenticado no AuthService. Conexão do WS cancelada.');
      return;
    }

    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      // Passa o userId via Query Param no handshake da conexão
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
