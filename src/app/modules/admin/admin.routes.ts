import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [
  {
    path: 'employees',
    loadComponent: () => import('./employees/employees.component').then(c => c.EmployeesComponent)
  },
];
