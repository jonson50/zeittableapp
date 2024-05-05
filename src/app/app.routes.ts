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
        path: 'dashboards',
        loadChildren: () => import('./modules/dashboards/dashboards.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'ecommerce',
        loadChildren: () => import('./modules/ecommerce/ecommerce.routes').then(m => m.ECOMMERCE_ROUTES)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./modules/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];

