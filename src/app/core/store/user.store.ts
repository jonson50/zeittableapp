import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { errorHandler } from "@app/core/interceptors/error.handler";
import { AuthService } from "@app/shared/parse/services/auth.service";
import { SnackbarService } from "@app/core/services/snackbar.service";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from "rxjs";
import { Setting } from "@app/shared/interfaces/setting.interface";
import { Project } from "@app/shared/interfaces/project.interface";
import { UserService } from "../../shared/parse/services/user.service";

type UserState = {
  user: any;
  isBusy: boolean;
  roles: string[];
  settings: Setting[];
  projects: Project[];
};

const initialState: UserState = {
  user: '',
  isBusy: false,
  roles: [],
  settings: [],
  projects: []
};


export const UserStore = signalStore(
  { providedIn: 'root' }, // => make it a global store
  withState(initialState),
  withMethods((
    store,
    authService = inject(AuthService),
    userService = inject(UserService),
    snackService = inject(SnackbarService),
    router = inject(Router)
  ) => ({
    updateUser(user: any): void {
      patchState(store, { user })
    },

    login: rxMethod<{ username: string, password: string }>(
      pipe(
        tap(() => patchState(store, { isBusy: true })),
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
              finalize: () => patchState(store, { isBusy: false })
            })
          )
        })
      )
    ),

    loadUserData: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isBusy: true })),
        switchMap(() => {
          return userService.getUserData().pipe(
            tapResponse({
              next: (data) => {
                console.log(data)
              },
              error: (error) => {
                console.log(error)
              }
            })
          )
        })
      )
    )
  }))
);
