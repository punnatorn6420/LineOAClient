import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly platformId = inject(PLATFORM_ID);

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get userAgent(): string {
    return this.isBrowser ? (navigator.userAgent ?? '') : '';
  }

  get isLineUserAgent(): boolean {
    return this.userAgent.toLowerCase().includes('line');
  }

  get isLiffEnvironment(): boolean {
    if (!this.isBrowser) {
      return false;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const liffFlag = urlParams.get('liff');

    return liffFlag === '1' || liffFlag === 'true' || this.userAgent.toLowerCase().includes('liff');
  }

  get liffDeepLink(): string | null {
    if (!this.isBrowser) {
      return null;
    }

    const metaTag = document.querySelector<HTMLMetaElement>('meta[name="liff-id"]');
    const liffId = metaTag?.content?.trim() ?? '';
    if (!liffId) {
      return null;
    }

    return `https://liff.line.me/${liffId}`;
  }
}
