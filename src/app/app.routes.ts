import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { PdpaComponent } from './pages/pdpa/pdpa.component';
import { UnsupportedComponent } from './pages/unsupported/unsupported.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'entry' },
  { path: 'entry', component: AuthComponent },
  { path: 'pdpa', component: PdpaComponent },
  {
    path: 'booking',
    loadComponent: () =>
      import('./pages/booking/booking.component').then((m) => m.BookingComponent),
  },

  { path: 'unsupported', component: UnsupportedComponent },

  { path: '**', redirectTo: 'entry' },
];
