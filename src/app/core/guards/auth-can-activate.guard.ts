import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/parse/services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { UserStore } from '@app/core/store/user.store';

export const authCanActivateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userStore = inject(UserStore);
  const router = inject(Router);

  return authService.check().pipe(
    tap(auth => {
      if (!auth) {
        router.navigate(['auth', 'login']);
      } else {
        userStore.updateUser(authService.currentUser());
      }
    })
  )
};
