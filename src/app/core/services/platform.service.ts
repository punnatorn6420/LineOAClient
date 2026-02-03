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

  get isLiffEnvironment(): boolean {
    if (!this.isBrowser) {
      return false;
    }

    const userAgent = navigator.userAgent ?? '';
    const urlParams = new URLSearchParams(window.location.search);
    const liffFlag = urlParams.get('liff');

    return (
      liffFlag === '1' ||
      liffFlag === 'true' ||
      userAgent.toLowerCase().includes('line') ||
      userAgent.toLowerCase().includes('liff')
    );
  }
}
