import { Injectable } from '@angular/core';
import liff from '@line/liff';
import { PlatformService } from './platform.service';

type LiffProfile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

declare global {
  interface Window {
    LIFF_ID?: string;
  }
}

@Injectable({
  providedIn: 'root',
})
export class LiffService {
  private initialized = false;
  private profile: LiffProfile | null = null;
  private accessToken: string | null = null;
  private idToken: string | null = null;

  constructor(private readonly platform: PlatformService) {}

  async init(): Promise<void> {
    if (!this.platform.isBrowser || this.initialized) {
      return;
    }

    const liffId = this.getLiffId();
    if (!liffId) {
      console.warn('[LIFF] Missing LIFF ID. Set meta[name="liff-id"] or window.LIFF_ID.');
      return;
    }

    try {
      await liff.init({ liffId });
      this.initialized = true;

      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href });
        return;
      }

      this.accessToken = liff.getAccessToken();
      this.idToken = liff.getIDToken();
      this.profile = await liff.getProfile();
    } catch (error) {
      console.error('[LIFF] init failed', error);
    }
  }

  getProfile(): LiffProfile | null {
    return this.profile;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getIdToken(): string | null {
    return this.idToken;
  }

  private getLiffId(): string | null {
    if (!this.platform.isBrowser) {
      return null;
    }

    const metaTag = document.querySelector<HTMLMetaElement>('meta[name="liff-id"]');
    const metaValue = metaTag?.content?.trim();
    if (metaValue) {
      return metaValue;
    }

    const windowValue = (window as { LIFF_ID?: string }).LIFF_ID?.trim();
    return windowValue && windowValue.length > 0 ? windowValue : null;
  }
}
