import { Routes } from '@angular/router';
import { Chat } from './pages/chat/chat';
import { Login } from './pages/login/login';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Chat,
    canActivate: [authGuard]
  },

  {
    path: 'login',
    component: Login
  },
];
