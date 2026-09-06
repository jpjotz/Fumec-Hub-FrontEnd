import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendshipService } from '../../core/services/friendship.service';

@Component({
  imports: [FormsModule],
  selector: 'app-add-friend',
  styleUrl: './add-friend.css',
  templateUrl: './add-friend.html',
})
export class AddFriend {
  constructor(private friendshipService: FriendshipService) {}

  close = output<void>();

  search = signal('');
  message = signal('');

  loading = signal(false);

  pesquisar() {
    this.loading.set(true)
    this.friendshipService.sendFriendRequest(this.search()).subscribe({
      next: (data) => {
        this.message.set('Solicitação enviada!');
        this.loading.set(false)
      },

      error: (error) => {
        this.message.set(error.error.message || error.error);
        this.loading.set(false)
      }
    })
  }
}
