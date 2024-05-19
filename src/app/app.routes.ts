import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { authCanActivateGuard } from './core/guards/auth-can-activate.guard';
import { authCanActivateChildGuard } from './core/guards/auth-can-activate-child.guard';

export const APP_ROUTES: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'dashboards/finance' },
  /* {
    path: '',
    //canActivate: [NoAuthGuard],
    //canActivateChild: [NoAuthGuard],
    //loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
    //component: LayoutComponent,
    pathMatch: 'full',
    redirectTo: 'auth'
}, */
  {
    path: 'auth',
    //canActivate: [NoAuthGuard],
    //canActivateChild: [NoAuthGuard],
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  {
    path: '',
    canActivate: [authCanActivateGuard],
    canActivateChild: [authCanActivateChildGuard],
    loadComponent: () => import('./core/components/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'time-entry',
        loadComponent: () => import('./modules/time-entry/time-entry.component').then(c => c.TimeEntryComponent)
      },
      {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.routes').then(r => r.ADMIN_ROUTES)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./modules/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];

