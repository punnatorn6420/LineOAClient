import { Component } from '@angular/core';
import { LandingContent } from './components/landing-content';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LandingContent],
  template: `
    <div class="min-h-screen bg-slate-100 px-4 py-8 text-black">
      <main class="mx-auto w-full max-w-xl">
        <app-landing-content />
      </main>
    </div>
  `,
})
export class LandingPage {}
