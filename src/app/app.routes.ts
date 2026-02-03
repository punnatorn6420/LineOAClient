import { Routes } from '@angular/router';
import { LiffLayoutComponent } from './layouts/liff-layout.component';
import { FormPage } from './features/form/form.page';
import { PdpaPage } from './features/pdpa/pdpa.page';

export const routes: Routes = [
  {
    path: '',
    component: LiffLayoutComponent,
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
