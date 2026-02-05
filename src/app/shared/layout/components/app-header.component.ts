import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HlmButton } from '@ui/button';
import { LanguageSwitcherComponent } from '../../../core/components/language-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HlmButton, LanguageSwitcherComponent],
  template: `
    <header class="sticky top-0 z-20 border-b border-border/80 bg-white/95 backdrop-blur-sm">
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a routerLink="/" class="text-lg font-bold text-foreground">Line OA Client</a>

        <nav class="hidden items-center gap-2 md:flex">
          <a
            hlmBtn
            variant="ghost"
            size="sm"
            routerLink="/"
            [routerLinkActiveOptions]="{ exact: true }"
            routerLinkActive="bg-accent text-accent-foreground"
          >
            Home
          </a>
          <a
            hlmBtn
            variant="ghost"
            size="sm"
            routerLink="/pdpa"
            routerLinkActive="bg-accent text-accent-foreground"
          >
            PDPA
          </a>
          <a
            hlmBtn
            variant="ghost"
            size="sm"
            routerLink="/booking"
            routerLinkActive="bg-accent text-accent-foreground"
          >
            Booking
          </a>
        </nav>

        <app-language-switcher />
      </div>
    </header>
  `,
})
export class AppHeaderComponent {}
