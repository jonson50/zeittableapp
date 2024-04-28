import { Routes } from "@angular/router";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    //canActivate: [NoAuthGuard],
    //canActivateChild: [NoAuthGuard],
    //loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
    //component: LayoutComponent,
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },

];
