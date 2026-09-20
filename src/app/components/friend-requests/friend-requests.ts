import { Component, signal, output } from '@angular/core';
import { FriendshipService } from '../../core/services/friendship.service';

@Component({
  imports: [],
  selector: 'app-friend-requests',
  styleUrl: './friend-requests.css',
  templateUrl: './friend-requests.html',
})
export class FriendRequests {
  constructor(private friendshipService: FriendshipService) {}
  requests = signal<any[]>([]);
  requestRemoved = output<void>();

  ngOnInit() {
    this.friendshipService.getRequests().subscribe({
      next: (data: any) => {
        this.requests.set(data.requests);
      },
    });
  }

  aceitar(friendshipId: string) {
    this.friendshipService.acceptFriendShip(friendshipId).subscribe({
      next: (data) => {
        this.requests.update((requests) => {
          return requests.filter((request) => request.id !== friendshipId);
        });

        this.requestRemoved.emit();
      },

      error: (error) => {
        console.log(error.message);
      },
    });
  }

  rejeitar(friendshipId: string) {
    this.requests.update((requests) => {
      return requests.filter((request) => request.id !== friendshipId);
    });

    this.requestRemoved.emit();

    this.friendshipService.rejectFriendship(friendshipId).subscribe({
      error: (error) => {
        console.log(error.message);
      },
    });
  }
}
