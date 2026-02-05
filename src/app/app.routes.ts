import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    loadComponent: () => import('./layouts/web-layout.component').then((m) => m.WebLayoutComponent),
    loadChildren: () => import('./flows/web/web.routes').then((m) => m.WEB_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
