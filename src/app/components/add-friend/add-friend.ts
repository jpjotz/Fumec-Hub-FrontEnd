import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { FriendshipService } from '../../core/services/friendship.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-add-friend',
  styleUrl: './add-friend.css',
  templateUrl: './add-friend.html',
})
export class AddFriend {
  constructor(private friendshipService: FriendshipService) {}

  search = new FormControl('', Validators.required);
  message = signal('');

  loading = signal(false);

  pesquisar() {
    if (this.search.invalid) {
      this.search.markAsTouched();
      return;
    }

    this.loading.set(true);

    this.friendshipService.sendFriendRequest(this.search.value!).subscribe({
      next: (data) => {
        this.message.set('Solicitação enviada!');
        this.search.reset();
        this.loading.set(false);
      },

      error: (error) => {
        this.message.set(error.error.message || error.error);
        this.loading.set(false);
      },
    });
  }
}
