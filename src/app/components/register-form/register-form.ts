import { Component, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-register-form',
  styleUrl: './register-form.css',
  templateUrl: './register-form.html',
})
export class RegisterForm {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  name = signal('');
  email = signal('');
  password = signal('');
  message = signal('');

  showPassword = signal(false);
  loading = signal(false);

  goToLogin = output<void>();

  register() {
    this.authService.register(this.name(), this.email(), this.password()).subscribe({
      next: (data) => {
        this.message.set('Usuário criado!');
        setTimeout(() => {
          this.router.navigate(['/chat']);
        }, 2000);
      },

      error: (error) => {
        this.message.set(error.error.message || error.error);
      },
    });
  }
}
