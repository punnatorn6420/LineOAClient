import { Routes } from '@angular/router';
import { liffAuthGuard } from './core/guards/liff-auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'entry',
  },
  {
    path: 'login',
    pathMatch: 'full',
    redirectTo: 'entry',
  },
  {
    path: 'entry',
    loadComponent: () => import('./pages/entry/page').then((m) => m.EntryPage),
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/page').then((m) => m.LandingPage),
  },
  {
    path: 'callback',
    canActivate: [liffAuthGuard],
    loadComponent: () => import('./pages/callback/page').then((m) => m.CallbackPage),
  },
  {
    path: 'pdpa',
    canActivate: [liffAuthGuard],
    loadComponent: () => import('./pages/pdpa/page').then((m) => m.PdpaPage),
  },
  {
    path: 'booking',
    canActivate: [liffAuthGuard],
    loadComponent: () => import('./pages/booking/page').then((m) => m.BookingPage),
  },
  {
    path: '**',
    redirectTo: 'entry',
  },
];
