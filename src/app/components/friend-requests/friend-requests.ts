import { Component, output } from '@angular/core';
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
  requests: any[] = [];

  ngOnInit() {
    this.friendshipService.getRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
    });
  }

  aceitar(friendshipId: string) {
    this.friendshipService.acceptFriendShip(friendshipId).subscribe({
      next: (data) => {
        console.log(data);
      },

      error: (error) => {
        console.log(error.message);
      }
    });
  }
}
