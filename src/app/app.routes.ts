import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/web-layout.component').then((m) => m.WebLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'pdpa',
        loadComponent: () => import('./pages/pdpa/pdpa.page').then((m) => m.PdpaPage),
      },
      {
        path: 'booking',
        loadComponent: () => import('./pages/booking/booking.page').then((m) => m.BookingPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
