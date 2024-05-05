import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { UserStore } from '@app/core/store/user.store';

export const authCanActivateGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const _userStore = inject(UserStore);
  const _router = inject(Router);

  return _auth.check().pipe(
    tap(auth => {
      if (!auth) {
        _router.navigate(['auth', 'login']);
      } else {
        _userStore.updateUser(_auth.currentUser());
      }
    })
  )
};
