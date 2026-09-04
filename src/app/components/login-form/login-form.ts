import { Component, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login-form',
  styleUrl: './login-form.css',
  templateUrl: './login-form.html',
})
export class LoginForm {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  email = signal('');
  password = signal('');
  message = signal('');
  loading = signal(false);

  goToRegister = output<void>();

  login() {

    if(!this.email() || !this.password()) {
      this.message.set('Preencha todos os campos.');
      return;
    }

    this.loading.set(true)
    this.authService.login(this.email(), this.password()).subscribe({
      next: (data) => {
        this.message.set('Login efetuado com sucesso!');

        this.email.set('');
        this.password.set('');
        this.loading.set(false);

        this.router.navigate(['/chat']);
      },

      error: (error) => {
        this.message.set(error.error.message || error.error);
        this.loading.set(false);
      },
    });
  }
}
