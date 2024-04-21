import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboards/finance' },
  {
    path: '',
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

