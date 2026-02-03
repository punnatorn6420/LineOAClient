import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSwitcherComponent } from '../core/components/language-switcher.component';
import { TranslatePipe } from '../core/pipes/translate.pipe';

@Component({
  selector: 'app-web-layout',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe, LanguageSwitcherComponent],
  template: `
    <div class="layout-page">
      <header class="layout-header">
        <div>
          <div class="layout-brand">{{ 'layout.web.title' | translate }}</div>
          <p class="layout-subtitle">{{ 'layout.web.subtitle' | translate }}</p>
        </div>
        <div class="flex items-center gap-3">
          <app-language-switcher />
          <div class="layout-badge">{{ 'layout.web.badge' | translate }}</div>
        </div>
      </header>
      <main class="layout-content">
        <router-outlet />
      </main>
    </div>
  `,
})
export class WebLayoutComponent {}
