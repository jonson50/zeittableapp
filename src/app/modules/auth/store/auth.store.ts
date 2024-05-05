import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { errorHandler } from "@app/core/interceptors/error.handler";
import { AuthService } from "@app/core/services/auth.service";
import { SnackbarService } from "@app/core/services/snackbar.service";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from "rxjs";

type AuthState = {
  user: any;
  isLoading: boolean;
};

const initialState: AuthState = {
  user: '',
  isLoading: false
};


export const AuthStore = signalStore(
  { providedIn: 'root' }, // => make it a global store
  withState(initialState),
  withMethods((
    store,
    authService = inject(AuthService),
    snackService = inject(SnackbarService),
    router = inject(Router)
  ) => ({
    updateUser(user: any): void {
      patchState(store, { user })
    },

    login: rxMethod<{ username: string, password: string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((u: { username: string, password: string }) => {
          return authService.login(u.username, u.password).pipe(
            tapResponse({
              next: (user) => {
                patchState(store, { user })
                router.navigate(['/']);
              },
              error: (error: any) => {
                errorHandler(error);
                snackService.showSnack(error.message)
              },
              finalize: () => patchState(store, { isLoading: false })
            })
          )
        })
      )
    )
  }))
);
