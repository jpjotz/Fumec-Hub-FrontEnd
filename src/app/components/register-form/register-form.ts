import { Component, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CourseService } from '../../core/services/course.service';

@Component({
  imports: [FormsModule],
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

  name = signal('');
  email = signal('');
  password = signal('');
  message = signal('');

  courses = signal<any[]>([]);
  courseId = signal('');

  showPassword = signal(false);
  loading = signal(false);

  goToLogin = output<void>();

  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses.set(
          courses.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
        );
      },

      error: (error) => {
        console.log(error);
      }
    })
  }

  register() {
    if(!this.courseId()) {
      this.message.set("Selecione seu curso");
      return;
    }

    if (this.email()) {
      if (!this.email().endsWith('@fumec.edu.br')) {
        this.message.set('Use um e-mail institucional @fumec.edu.br');
        return;
      }
    }


    this.loading.set(true);

    this.authService.register(this.name(), this.email(), this.password(), this.courseId()).subscribe({
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
