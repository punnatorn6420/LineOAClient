import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSwitcherComponent } from '../core/components/language-switcher.component';
import { TranslatePipe } from '../core/pipes/translate.pipe';

@Component({
  selector: 'app-liff-layout',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe, LanguageSwitcherComponent],
  template: `
    <div class="layout-page layout-page--liff">
      <header class="layout-header">
        <div>
          <div class="layout-brand">{{ 'layout.liff.title' | translate }}</div>
          <p class="layout-subtitle">{{ 'layout.liff.subtitle' | translate }}</p>
        </div>
        <div class="flex items-center gap-3">
          <app-language-switcher />
          <div class="layout-badge">{{ 'layout.liff.badge' | translate }}</div>
        </div>
      </header>
      <main class="layout-content">
        <router-outlet />
      </main>
    </div>
  `,
})
export class LiffLayoutComponent {}
