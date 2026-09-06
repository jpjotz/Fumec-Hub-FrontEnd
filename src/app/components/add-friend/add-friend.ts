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

  pesquisar() {
    this.friendshipService.sendFriendRequest(Number(this.search())).subscribe({
      next: (data) => {
        this.message.set('Solicitação enviada!')
      },

      error: (error) => {
        this.message.set(error.error.message || error.error);
      }
    })
  }
}
