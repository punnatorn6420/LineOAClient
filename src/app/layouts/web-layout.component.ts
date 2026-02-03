import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-web-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="layout-page">
      <header class="layout-header">
        <div class="layout-brand">LineOA Web</div>
        <div class="layout-badge">Website</div>
      </header>
      <main class="layout-content">
        <router-outlet />
      </main>
    </div>
  `,
})
export class WebLayoutComponent {}
