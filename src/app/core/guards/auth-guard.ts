import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, catchError, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getMe().pipe(
    switchMap((user) => {
      if (user) return of(true);

      return authService.refresh().pipe(
        switchMap(() => authService.getMe()),
        map((user) => !!user),
      );
    }),
    map((authenticated) => (authenticated ? true : router.createUrlTree(['/login']))),
    catchError(() => of(router.createUrlTree(['/login']))),
  );
};
