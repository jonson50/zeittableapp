import { CanActivateFn } from '@angular/router';

export const authCanActivateChildGuard: CanActivateFn = (route, state) => {
  return true;
};
