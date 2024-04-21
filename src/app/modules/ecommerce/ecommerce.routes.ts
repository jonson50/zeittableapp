import { Routes } from "@angular/router";

export const ECOMMERCE_ROUTES: Routes = [
  {
    path: 'inventory',
    loadComponent: () => import('./inventory/inventory.component').then(m => m.InventoryComponent)
  },
  {
    path: 'invoices',
    loadComponent: () => import('./invoices/invoices.component').then(m => m.InvoicesComponent)
  },
  /* {
    path: 'project',
    loadComponent: () => import('./project/project.component').then(m => m.ProjectComponent)
  }, */
];
