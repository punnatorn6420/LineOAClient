import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-web-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-[#f3f4f6] text-black">
      <main class="mx-auto w-full max-w-4xl px-6 pb-48 pt-8">
        <router-outlet />
      </main>
    </div>
  `,
})
export class WebLayoutComponent {}
