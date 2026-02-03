import { Component } from '@angular/core';
import { I18nService } from '../services/i18n.service';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="flex items-center gap-2 text-xs text-muted-foreground">
      <span>{{ 'layout.language' | translate }}</span>
      <div class="flex items-center gap-1 rounded-full border border-border bg-secondary/40 p-1">
        @for (language of languages; track language) {
          <button
            type="button"
            class="rounded-full px-2 py-1 text-xs font-semibold"
            [class.bg-primary]="language === currentLanguage"
            [class.text-primary-foreground]="language === currentLanguage"
            [class.text-foreground]="language !== currentLanguage"
            (click)="setLanguage(language)"
          >
            {{ ('language.' + language) | translate }}
          </button>
        }
      </div>
    </div>
  `,
})
export class LanguageSwitcherComponent {
  constructor(private readonly i18n: I18nService) {}

  get languages(): string[] {
    return this.i18n.languages;
  }

  get currentLanguage(): string {
    return this.i18n.currentLanguage;
  }

  setLanguage(language: string): void {
    this.i18n.setLanguage(language);
  }
}
