import { Component } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { ChatList } from '../../components/chat-list/chat-list';

@Component({
  imports: [ChatList],
  selector: 'app-chat',
  styleUrl: './chat.css',
  templateUrl: './chat.html',
})
export class Chat {

}
