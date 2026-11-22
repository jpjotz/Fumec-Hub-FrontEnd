import { Component, signal, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login-form',
  styleUrl: './login-form.css',
  templateUrl: './login-form.html',
})
export class LoginForm {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  message = signal('');
  loading = signal(false);

  showPassword = signal(false);

  goToRegister = output<void>();

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    this.loading.set(true);

    this.authService.login(email!, password!).subscribe({
      next: (data) => {
        this.message.set('Login efetuado com sucesso!');

        this.loginForm.reset();
        this.loading.set(false);

        this.router.navigate(['/'], { replaceUrl: true });
      },

      error: (error) => {
        this.message.set(error.error.message || error.error);
        this.loading.set(false);
      },
    });
  }
}
