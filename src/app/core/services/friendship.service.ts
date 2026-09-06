import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FriendshipService {
  private apiUrl = 'https://fumec-hub-backend.onrender.com/';

  constructor(private http: HttpClient) {}

  sendFriendRequest(friendCode: string) {
    return this.http.post(this.apiUrl + 'friends/new', { friendCode }, { withCredentials: true });
  }

  getRequests() {
    return this.http.get<any[]>(this.apiUrl + 'friends/requests', { withCredentials: true });
  }

  acceptFriendShip(friendshipId: string) {
    return this.http.patch(this.apiUrl + 'friends/accept/' + friendshipId, {}, {withCredentials: true});
  }
}
