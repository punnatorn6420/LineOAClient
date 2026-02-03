import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly storageKey = 'lineoa-language';
  private readonly supportedLanguages = ['th', 'en'];
  private readonly translations = signal<Record<string, unknown>>({});
  private readonly loadedLanguages = new Map<string, Record<string, unknown>>();
  private readonly currentLanguageSignal = signal('th');

  constructor(
    private readonly http: HttpClient,
    private readonly platform: PlatformService,
  ) {}

  init(): void {
    const preferred = this.getSavedLanguage() ?? 'th';
    const language = this.isSupported(preferred) ? preferred : 'th';
    this.setLanguage(language);
  }

  get languages(): string[] {
    return [...this.supportedLanguages];
  }

  get currentLanguage(): string {
    return this.currentLanguageSignal();
  }

  setLanguage(language: string): void {
    if (!this.isSupported(language)) {
      return;
    }

    this.currentLanguageSignal.set(language);
    this.persistLanguage(language);
    void this.loadLanguage(language);
  }

  translate(key: string): string {
    const value = this.resolveKey(key, this.translations());
    return typeof value === 'string' ? value : key;
  }

  private isSupported(language: string): boolean {
    return this.supportedLanguages.includes(language);
  }

  private getSavedLanguage(): string | null {
    if (!this.platform.isBrowser) {
      return null;
    }

    return window.localStorage.getItem(this.storageKey);
  }

  private persistLanguage(language: string): void {
    if (!this.platform.isBrowser) {
      return;
    }

    window.localStorage.setItem(this.storageKey, language);
  }

  private async loadLanguage(language: string): Promise<void> {
    if (this.loadedLanguages.has(language)) {
      this.translations.set(this.loadedLanguages.get(language) ?? {});
      return;
    }

    try {
      const data = await firstValueFrom(
        this.http.get<Record<string, unknown>>(`/assets/i18n/${language}.json`),
      );
      this.loadedLanguages.set(language, data ?? {});
      this.translations.set(data ?? {});
    } catch {
      if (language !== 'th') {
        await this.loadLanguage('th');
      }
    }
  }

  private resolveKey(key: string, source: Record<string, unknown>): unknown {
    return key.split('.').reduce<unknown>((current, segment) => {
      if (current == null) {
        return undefined;
      }

      if (Array.isArray(current)) {
        const index = Number(segment);
        return Number.isNaN(index) ? undefined : current[index];
      }

      if (typeof current === 'object') {
        return (current as Record<string, unknown>)[segment];
      }

      return undefined;
    }, source);
  }
}
