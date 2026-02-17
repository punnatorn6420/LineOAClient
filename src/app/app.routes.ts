import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { UnsupportedComponent } from './pages/unsupported/unsupported.component';
import { PdpaComponent } from './pages/pdpa/pdpa.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BundleComponent } from './pages/bundle/bundle.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'entry' },
  { path: 'entry', component: AuthComponent },
  { path: 'pdpa', component: PdpaComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'bundle', component: BundleComponent },
  { path: 'unsupported', component: UnsupportedComponent },
  { path: '**', redirectTo: 'entry' },
];
