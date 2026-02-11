import { Routes } from '@angular/router';
import { liffAuthGuard } from './core/guards/liff-auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/landing-redirect.component').then((m) => m.LandingRedirectComponent),
  },
  {
    path: 'liff',
    canActivateChild: [liffAuthGuard],
    loadComponent: () => import('./layouts/liff-layout.component').then((m) => m.LiffLayoutComponent),
    loadChildren: () => import('./flows/liff/liff.routes').then((m) => m.LIFF_ROUTES),
  },
  {
    path: 'web',
    loadComponent: () => import('./layouts/web-layout.component').then((m) => m.WebLayoutComponent),
    loadChildren: () => import('./flows/web/web.routes').then((m) => m.WEB_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
