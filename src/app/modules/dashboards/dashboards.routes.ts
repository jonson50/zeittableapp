import { Routes } from "@angular/router";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'analytics',
    loadComponent: () => import('./analytics/analytics.component').then(m => m.AnalyticsComponent)
  },
  {
    path: 'finance',
    loadComponent: () => import('./finance/finance.component').then(m => m.FinanceComponent)
  },
  {
    path: 'project',
    loadComponent: () => import('./project/project.component').then(m => m.ProjectComponent)
  },
];
