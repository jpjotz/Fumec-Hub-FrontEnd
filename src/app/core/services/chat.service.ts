import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chats = [
    {
      id: '1',
      otherUser: {
        id: '101',
        name: 'Ana Souza',
        Course: { name: 'Ciência da Computação' },
      },
    },
    {
      id: '2',
      otherUser: {
        id: '102',
        name: 'Pedro Lima',
        Course: { name: 'Sistemas de Informação' },
      },
    },
    {
      id: '3',
      otherUser: {
        id: '103',
        name: 'Mariana Costa',
        Course: { name: 'Engenharia de Software' },
      },
    },
  ];

  private messages = [
    { id: '1', chatId: '1', senderId: '101', content: 'Oi! Tudo bem?' },
    { id: '2', chatId: '1', senderId: 'current-user', content: 'Tudo sim!' },
    { id: '3', chatId: '2', senderId: '102', content: 'Vamos estudar juntos?' },
  ];

  getChats() {
    return of({ chats: this.chats });
  }

  searchChats(name: string) {
    const result = this.chats.filter((chat) =>
      chat.otherUser.name.toLowerCase().includes(name.toLowerCase()),
    );

    return of(result);
  }

  createChat(otherUser: any) {
    const newChat = {
      id: crypto.randomUUID(),
      otherUser,
    };

    this.chats.push(newChat);

    return of(newChat);
  }

  updateChat(id: string, otherUser: any) {
    const index = this.chats.findIndex((chat) => chat.id === id);

    if (index === -1) return of(null);

    this.chats[index] = { ...this.chats[index], otherUser };

    return of(this.chats[index]);
  }

  deleteChat(id: string) {
    this.chats = this.chats.filter((chat) => chat.id !== id);
    this.messages = this.messages.filter((message) => message.chatId !== id);

    return of(true);
  }

  getMessages(chatId: string) {
    return of(this.messages.filter((message) => message.chatId === chatId));
  }

  createMessage(chatId: string, content: string) {
    const newMessage = {
      id: crypto.randomUUID(),
      chatId,
      senderId: 'current-user',
      content,
    };

    this.messages.push(newMessage);

    return of(newMessage);
  }

  updateMessage(id: string, content: string) {
    const message = this.messages.find((message) => message.id === id);

    if (!message) return of(null);

    message.content = content;

    return of(message);
  }

  deleteMessage(id: string) {
    this.messages = this.messages.filter((message) => message.id !== id);

    return of(true);
  }
}
