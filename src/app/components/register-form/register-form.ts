import { Component, signal, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CourseService } from '../../core/services/course.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register-form',
  styleUrl: './register-form.css',
  templateUrl: './register-form.html',
})
export class RegisterForm {
  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router,
  ) {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[^\s@]+@fumec\.edu\.br$/i),
    ]),
    courseId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  message = signal('');

  courses = signal<any[]>([]);

  showPassword = signal(false);
  loading = signal(false);

  goToLogin = output<void>();

  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses.set(courses.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')));
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { name, email, password, confirmPassword, courseId } = this.registerForm.getRawValue();

    if (password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ mismatch: true });
      return;
    }

    this.loading.set(true);

    this.authService.register(name!, email!, password!, courseId!).subscribe({
      next: (data) => {
        this.message.set('Usuário criado com sucesso!');
        this.loading.set(false);

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },

      error: (error) => {
        this.message.set(error.error.message || error.error);
        this.loading.set(false);
      },
    });
  }
}
