import { Component, signal, output, input, effect } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { ChatItem } from '../chat-item/chat-item';
import { Router } from '@angular/router';
import { AddFriend } from '../add-friend/add-friend';
import { FriendRequests } from '../friend-requests/friend-requests';
import { Modal } from '../shared/modal/modal';
import { AuthService } from '../../core/services/auth.service';
import { WebSocketService } from '../../core/services/websocket.service';
import { FriendshipService } from '../../core/services/friendship.service';

import { ChatInterface } from '../../models/ChatInterface';
import { UserInterface } from '../../models/UserInterface';

@Component({
  imports: [ChatItem, AddFriend, FriendRequests, Modal],
  selector: 'app-chat-list',
  styleUrl: './chat-list.css',
  templateUrl: './chat-list.html',
})
export class ChatList {
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private webSocketService: WebSocketService,
    private router: Router,
    private friendshipService: FriendshipService,
  ) {
    effect(() => {
      const received = this.webSocketService.friendRequestReceived();

      if (received > 0) {
        this.friendRequestCount.update((count) => count + received);
        this.webSocketService.friendRequestReceived.set(0);
      }
    });

    effect(() => {
      const newChats = this.webSocketService.newChats();

      if (newChats.length > 0) {
        this.chats.update((chats) => [...chats, ...newChats]);
        this.filteredChats.update((chats) => [...chats, ...newChats]);
        this.webSocketService.newChats.set([]);
      }
    });

    effect(() => {
      const friendshipId = this.webSocketService.friendshipDeleted();

      if (!friendshipId) return;

      this.chats.update((chats) => chats.filter((chat) => chat.friendshipId !== friendshipId));

      this.filteredChats.update((chats) =>
        chats.filter((chat) => chat.friendshipId !== friendshipId),
      );

      this.webSocketService.friendshipDeleted.set(null);
    });
  }

  chats = signal<ChatInterface[]>([]);
  filteredChats = signal<ChatInterface[]>([]);
  searchValue = signal('');

  user = input<UserInterface>();

  friendsView = signal('add');
  showFriends = signal(false);
  showProfile = signal(false);

  editingName = signal(false);
  newName = signal('');

  changePasswordSection = signal(false);

  openChatSelected = output<ChatInterface>();

  friendRequestCount = signal(0);

  passwordVisible = signal(false);
  newPasswordVisible = signal(false);

  currentPassword = signal('');
  newPassword = signal('');
  confirmNewPassword = signal('');
  statusMessage = signal('');
  passwordChangeSuccess = signal(false);

  loading = signal(false);

  deleteAccountInput = signal(false);
  deleteAccountPassword = signal('');
  seePassword = signal(false);
  deleteStatusMsg = signal('');
  deleteStatus = signal(false);
  deleteLoading = signal(false);

  verifyNewPasswordInputs() {
    if (this.newPassword() !== this.confirmNewPassword()) {
      this.statusMessage.set('As senhas não coincidem');
      return;
    }

    this.loading.set(true);

    this.authService.changePassword(this.currentPassword(), this.newPassword()).subscribe({
      next: (data: any) => {
        this.statusMessage.set(data.message + ' Efetue novamente o login.');
        this.passwordChangeSuccess.set(true);
        this.loading.set(false);
        this.authService.logout();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },

      error: (err) => {
        this.passwordChangeSuccess.set(false);
        this.statusMessage.set(err.error.message);
        this.loading.set(false);
      },
    });
  }

  editName() {
    this.newName.set(this.user()?.name || '');
    this.editingName.set(true);
  }

  cancelEditName() {
    this.newName.set('');
    this.editingName.set(false);
  }

  saveName() {
    this.authService.editProfile(this.newName()).subscribe({
      next: () => {
        this.authService.user.update((user) => ({
          ...user,
          name: this.newName(),
        }));
        this.editingName.set(false);
      },
    });
  }

  deleteAccount() {
    this.deleteLoading.set(true);

    this.authService.deleteAccount(this.deleteAccountPassword()).subscribe({
      next: () => {
        this.deleteStatusMsg.set('Conta deletada com sucesso!');
        this.deleteLoading.set(false);
        this.deleteStatus.set(true);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },

      error: (err) => {
        this.deleteStatusMsg.set(err.error.message);
        this.deleteLoading.set(false);
      },
    });
  }

  openChat(chat: ChatInterface) {
    this.openChatSelected.emit(chat);
  }

  searchContact(term: string) {
    this.filteredChats.set(
      this.chats().filter((chat) => chat.otherUser.name.toLowerCase().includes(term.toLowerCase())),
    );
  }

  ngOnInit() {
    this.webSocketService.connect();

    this.chatService.getChats().subscribe({
      next: (data: any) => {
        console.log('CHATS:', data.chats);
        this.chats.set(data.chats);
        this.filteredChats.set(data.chats);
      },
    });

    this.friendshipService.getRequests().subscribe({
      next: (data) => {
        this.friendRequestCount.set(data.count);
      },
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
