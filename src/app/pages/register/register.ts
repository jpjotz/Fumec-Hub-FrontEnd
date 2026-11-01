import { Component } from '@angular/core';
import { RegisterForm } from '../../components/register-form/register-form';
import { Router } from '@angular/router';

@Component({
  imports: [RegisterForm],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
