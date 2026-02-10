import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HlmButton } from '@ui/button';
import { HlmCheckbox } from '@ui/checkbox';
import { LanguageSwitcherComponent } from '../../core/components/language-switcher.component';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { PdpaContentComponent } from './components/pdpa-content.component';

@Component({
  selector: 'app-pdpa-page',
  standalone: true,
  imports: [
    HlmButton,
    HlmCheckbox,
    LanguageSwitcherComponent,
    TranslatePipe,
    PdpaContentComponent,
  ],
  template: `
    <section class="mx-auto w-full max-w-5xl">
      <article class="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <header class="flex flex-col gap-4 border-b border-border px-4 py-4 md:px-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nokair Booking Flight</p>
              <h1 class="mt-1 text-lg font-bold text-foreground md:text-2xl">
                {{ 'pdpa.privacyNotice' | translate }}
              </h1>
            </div>
            <app-language-switcher />
          </div>

          <div class="flex items-center gap-3 rounded-xl bg-[#f8c800] px-4 py-3 text-black">
            <div class="flex h-8 w-8 items-center justify-center rounded-full border border-black/30 bg-white text-[10px] font-bold">☺</div>
            <p class="text-xl font-black leading-none tracking-wide md:text-2xl">NOK AIR</p>
          </div>
        </header>

        <div class="max-h-[52dvh] overflow-y-auto px-4 py-5 md:max-h-[56dvh] md:px-6 md:py-6">
          <app-pdpa-content />
        </div>

        <footer class="space-y-4 border-t border-border bg-background px-4 py-4 md:px-6">
          <label class="flex cursor-pointer items-start gap-3 text-sm leading-6 text-foreground md:text-base">
            <hlm-checkbox
              [checked]="isAccepted()"
              (checkedChange)="isAccepted.set($event)"
              class="mt-1 border-[#bcbcbc] data-[state=checked]:border-[#f8c800] data-[state=checked]:bg-[#f8c800] data-[state=checked]:text-black"
            />
            <span>{{ 'PDPA_ACCEPT_TEXT' | translate }}</span>
          </label>

          <button
            hlmBtn
            type="button"
            class="h-11 w-full rounded-lg border border-black text-base font-bold md:ml-auto md:w-auto md:min-w-52 md:px-8"
            [disabled]="!isAccepted()"
            [class.cursor-not-allowed]="!isAccepted()"
            [style.backgroundColor]="isAccepted() ? '#f8c800' : '#dddddd'"
            [style.color]="isAccepted() ? '#000000' : '#9a9a9a'"
            [style.borderColor]="isAccepted() ? '#000000' : '#dddddd'"
            (click)="onConfirm()"
          >
            {{ 'PDPA_CONFIRM_BUTTON' | translate }}
          </button>
        </footer>
      </article>
    </section>
  `,
})
export class PdpaPage {
  protected readonly isAccepted = signal(false);

  constructor(private readonly router: Router) {}

  protected onConfirm(): void {
    if (!this.isAccepted()) {
      return;
    }

    void this.router.navigate(['/booking']);
  }
}
