import { inject } from "@angular/core";
import { EmployeesService } from "@app/shared/parse/services/employees.service";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, tap, switchMap } from "rxjs";

type EmployeesState = {
  isBusy: boolean;
  employess: any[];

};

const initialState: EmployeesState = {
  isBusy: false,
  employess: [],
};

export const EmployeesStore = signalStore(
  withState(initialState),
  withMethods((
    store,
    employeesService = inject(EmployeesService),
  ) => ({
    loadEmployees: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isBusy: true })),
        switchMap(() => {
          return employeesService.getEmployees().pipe(
            tapResponse({
              next: (data) => {
                console.log(data)
              },
              error: (error) => {
                console.log(error)
              },
              finalize: () => patchState(store, { isBusy: false })
            })
          )
        })
      )
    )
  }))
)
