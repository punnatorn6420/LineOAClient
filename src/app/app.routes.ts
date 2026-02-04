import { Routes } from '@angular/router';
import { LiffLayoutComponent } from './layouts/liff-layout.component';
import { FormPage } from './features/form/form.page';
import { PdpaPage } from './features/pdpa/pdpa.page';
import { liffAuthGuard } from './core/guards/liff-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LiffLayoutComponent,
    canActivateChild: [liffAuthGuard],
    children: [
      { path: '', redirectTo: 'pdpa', pathMatch: 'full' },
      { path: 'pdpa', component: PdpaPage },
      { path: 'form', component: FormPage },
    ],
  },
  {
    path: '**',
    redirectTo: 'pdpa',
  },
];
