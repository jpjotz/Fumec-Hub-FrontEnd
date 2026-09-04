import { Routes } from '@angular/router';
import { Chat } from './pages/chat/chat';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },

  {
    path: 'chat',
    component: Chat,
  },
];
