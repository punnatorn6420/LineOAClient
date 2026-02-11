import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@ui/button';
import { HlmCard } from '@ui/card';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe, HlmButton, HlmCard],
  template: `
    <section
      hlmCard
      class="gap-4 border border-border bg-white/80 px-6 py-6 text-[22px] text-foreground shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
    >
      <h1 class="text-[22px] font-bold">{{ 'form.title' | translate }}</h1>
      <p class="text-[20px] text-muted-foreground">
        {{ 'form.description' | translate }}
      </p>
      <div class="flex flex-wrap gap-3">
        <a hlmBtn size="lg" class="border border-[#222] text-[20px] font-bold" routerLink="../pdpa">
          {{ 'form.backToPdpa' | translate }}
        </a>
      </div>
    </section>
  `,
})
export class FormPage {}
