import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-liff-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="layout-page layout-page--liff">
      <header class="layout-header">
        <div>
          <div class="layout-brand">LineOA</div>
          <p class="layout-subtitle">LIFF Experience</p>
        </div>
        <div class="layout-badge">LINE</div>
      </header>
      <main class="layout-content">
        <router-outlet />
      </main>
    </div>
  `,
})
export class LiffLayoutComponent {}
