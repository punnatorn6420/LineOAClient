import { Routes } from '@angular/router';
import { LandingRedirectComponent } from './layouts/landing-redirect.component';
import { LiffLayoutComponent } from './layouts/liff-layout.component';
import { WebLayoutComponent } from './layouts/web-layout.component';
import { FormPage } from './features/form/form.page';
import { PdpaPage } from './features/pdpa/pdpa.page';

export const routes: Routes = [
  {
    path: '',
    component: LandingRedirectComponent,
  },
  {
    path: 'web',
    component: WebLayoutComponent,
    children: [
      { path: '', redirectTo: 'pdpa', pathMatch: 'full' },
      { path: 'pdpa', component: PdpaPage },
      { path: 'form', component: FormPage },
    ],
  },
  {
    path: 'liff',
    component: LiffLayoutComponent,
    children: [
      { path: '', redirectTo: 'pdpa', pathMatch: 'full' },
      { path: 'pdpa', component: PdpaPage },
      { path: 'form', component: FormPage },
    ],
  },
  {
    path: 'form',
    redirectTo: 'web/form',
    pathMatch: 'full',
  },
  {
    path: 'pdpa',
    redirectTo: 'web/pdpa',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'web/pdpa',
  },
];
