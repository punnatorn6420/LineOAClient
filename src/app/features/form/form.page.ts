import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <section class="card space-y-4">
      <h1 class="text-xl font-semibold text-foreground">{{ 'form.title' | translate }}</h1>
      <p class="text-sm text-muted-foreground">{{ 'form.description' | translate }}</p>
      <div class="flex flex-wrap gap-3">
        <a class="btn-primary" routerLink="/web/pdpa">
          {{ 'form.backToPdpa' | translate }}
        </a>
        <a class="btn-secondary" routerLink="/liff/pdpa">
          {{ 'form.lineMode' | translate }}
        </a>
      </div>
    </section>
  `,
})
export class FormPage {}
