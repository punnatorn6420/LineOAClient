import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSwitcherComponent } from '../core/components/language-switcher.component';
import { TranslatePipe } from '../core/pipes/translate.pipe';

@Component({
  selector: 'app-liff-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-[#f5f5f5] text-foreground">
      <header class="flex h-16 items-center bg-[#FCCD01] px-4">
        <div class="w-24">
          <img
            src="/assets/images/nokair-logo.png"
            alt="Nok Air logo"
            class="h-full w-full object-cover"
          />
        </div>
        <!-- <div class="text-2xl font-bold text-black">
          {{ 'layout.liff.title' | translate }}
        </div> -->
        <!-- <div class="ml-auto">
          <app-language-switcher />
        </div> -->
      </header>
      <main class="mx-auto w-full max-w-3xl px-4 py-8 pb-44">
        <router-outlet />
      </main>
    </div>
  `,
})
export class LiffLayoutComponent {}
