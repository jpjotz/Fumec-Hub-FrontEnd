import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: WebSocket;

  messages = signal<any[]>([]);
  notifications = signal<any[]>([]);

  connect(chatId?: string) {
    this.messages.set([]);

    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket('wss://fumec-hub-backend.onrender.com');

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
    } else {
      if (chatId) {
        this.joinChat(chatId);
      }
    }
  }

  joinChat(chatId: string) {
    this.socket.send(
      JSON.stringify({
        event: 'joinChat',
        chatId,
      }),
    );
  }

  clearNotifications(chatId: string) {
    this.notifications.update((notifications) => notifications.filter((n) => n.chatId !== chatId));
  }

  sendMessage(chatId: string, content: string) {
    this.socket.send(
      JSON.stringify({
        event: 'sendMessage',
        chatId,
        content,
      }),
    );
  }
}
