import { Injectable } from '@angular/core';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class PdpaConsentService {
  private readonly storageKey = 'pdpa-consent';

  constructor(private readonly platform: PlatformService) {}

  getConsent(): boolean {
    if (!this.platform.isBrowser) {
      return false;
    }

    return window.localStorage.getItem(this.storageKey) === 'true';
  }

  setConsent(accepted: boolean): void {
    if (!this.platform.isBrowser) {
      return;
    }

    window.localStorage.setItem(this.storageKey, String(accepted));
  }
}
