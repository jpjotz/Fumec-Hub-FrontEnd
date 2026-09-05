import { Component, output, signal } from '@angular/core';
import { FriendshipService } from '../../core/services/friendship.service';

@Component({
  imports: [],
  selector: 'app-friend-requests',
  styleUrl: './friend-requests.css',
  templateUrl: './friend-requests.html',
})
export class FriendRequests {
  constructor(private friendshipService: FriendshipService) {}

  close = output<void>();
  requests = signal<any[]>([]);

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
        this.requests.update(requests => {
          return requests.filter(request => request.id !== friendshipId);
        })
      },

      error: (error) => {
        console.log(error.message);
      }
    });
  }
}
