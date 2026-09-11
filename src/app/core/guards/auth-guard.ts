import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, catchError, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getMe().pipe(
    map(() => true),

    catchError(() => {
      return authService.refresh().pipe(
        switchMap(() => authService.getMe()),
        map(() => true),
        catchError(() => {
          router.navigate(['/login']);
          return of(false);
        }),
      );
    }),
  );
};
