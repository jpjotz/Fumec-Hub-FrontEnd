import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  email = signal('');
  password = signal('');
  message = signal(' ');

  login() {
    this.authService.login(this.email(), this.password()).subscribe({
      next: (data) => {
        this.message.set('Login efetuado com sucesso!');

        this.email.set('');
        this.password.set('');

        this.router.navigate(['/chat']);
      },

      error: (error) => {
        this.message.set(error.error.message);
      },
    });
  }
}
