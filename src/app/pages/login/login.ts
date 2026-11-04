import { Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { Router } from '@angular/router';

@Component({
  imports: [LoginForm],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  constructor(public router: Router) {}
}
