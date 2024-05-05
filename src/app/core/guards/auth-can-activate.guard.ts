import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthStore } from '@app/modules/auth/store/auth.store';

export const authCanActivateGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const _authStore = inject(AuthStore);
  const _router = inject(Router);

  return _auth.check().pipe(
    tap(auth => {
      if (!auth) {
        _router.navigate(['auth', 'login']);
      } else {
        _authStore.updateUser(_auth.currentUser());
      }
    })
  )
};
