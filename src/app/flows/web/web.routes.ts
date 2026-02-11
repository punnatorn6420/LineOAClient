import { Routes } from '@angular/router';

export const WEB_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'pdpa',
    pathMatch: 'full',
  },
  {
    path: 'pdpa',
    loadComponent: () => import('../../features/pdpa/pdpa.page').then((m) => m.PdpaPage),
  },
  {
    path: 'booking',
    loadComponent: () => import('../../features/form/form.page').then((m) => m.FormPage),
  },
];
