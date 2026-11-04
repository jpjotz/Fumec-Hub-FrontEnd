import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterForm } from '../../components/register-form/register-form';

@Component({
  imports: [RegisterForm],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  constructor(public router: Router) {}
}
