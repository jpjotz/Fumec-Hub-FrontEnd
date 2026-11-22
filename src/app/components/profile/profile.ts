import { Component, signal, input, output, effect } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserInterface } from '../../models/UserInterface';
import { Modal } from '../shared/modal/modal';

@Component({
  imports: [Modal, ReactiveFormsModule],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    effect(() => {
      const name = this.user()?.name;

      if (name) {
        this.nameForm.setValue(name);
      }
    });
  }

  user = input<UserInterface>();
  close = output<void>();

  editingName = signal(false);
  nameForm = new FormControl({ value: '', disabled: true }, Validators.required);

  changePasswordSection = signal(false);

  passwordVisible = signal(false);
  newPasswordVisible = signal(false);

  passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmNewPassword = control.get('confirmNewPassword')?.value;

    return newPassword === confirmNewPassword ? null : { passwordMismatch: true };
  };

  passwordForm = new FormGroup(
    {
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmNewPassword: new FormControl('', Validators.required),
    },
    { validators: this.passwordMatchValidator },
  );

  statusMessage = signal('');
  passwordChangeSuccess = signal(false);

  loading = signal(false);

  deleteAccountInput = signal(false);
  deleteAccountForm = new FormControl('', Validators.required);
  seePassword = signal(false);
  deleteStatusMsg = signal('');
  deleteStatus = signal(false);
  deleteLoading = signal(false);

  verifyNewPasswordInputs() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { currentPassword, newPassword, confirmNewPassword } = this.passwordForm.getRawValue();

    this.loading.set(true);

    this.authService.changePassword(currentPassword!, newPassword!).subscribe({
      next: (data: any) => {
        this.statusMessage.set(data.message + ' Efetue novamente o login.');
        this.passwordChangeSuccess.set(true);
        this.loading.set(false);
        this.authService.logout();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },

      error: (err) => {
        this.passwordChangeSuccess.set(false);
        this.statusMessage.set(err.error.message);
        this.loading.set(false);
      },
    });
  }

  editName() {
    this.nameForm.setValue(this.user()?.name || '');
    this.editingName.set(true);
    this.nameForm.enable();
  }

  cancelEditName() {
    this.nameForm.setValue(this.user()?.name || '');
    this.nameForm.disable();
    this.editingName.set(false);
  }

  saveName() {
    if (this.nameForm.invalid) {
      this.nameForm.markAsTouched();
      return;
    }

    this.authService.editProfile(this.nameForm.value!).subscribe({
      next: () => {
        this.authService.user.update((user) => ({
          ...user,
          name: this.nameForm.value!,
        }));
        this.editingName.set(false);
        this.nameForm.disable();
        this.editingName.set(false);
      },
    });
  }

  deleteAccount() {
    if (this.deleteAccountForm.invalid) {
      this.deleteAccountForm.markAsTouched();
      return;
    }

    this.deleteLoading.set(true);

    this.authService.deleteAccount(this.deleteAccountForm.value!).subscribe({
      next: () => {
        this.deleteStatusMsg.set('Conta deletada com sucesso!');
        this.deleteLoading.set(false);
        this.deleteStatus.set(true);

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },

      error: (err) => {
        this.deleteStatusMsg.set(err.error.message);
        this.deleteLoading.set(false);
      },
    });
  }
}
