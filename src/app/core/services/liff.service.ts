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
  private loggedIn = false;
  private profile: LiffProfile | null = null;
  private accessToken: string | null = null;
  private idToken: string | null = null;
  private initError: string | null = null;
  private inClient = false;
  private initPromise: Promise<void> | null = null;

  constructor(private readonly platform: PlatformService) {}

  async init(): Promise<void> {
    if (!this.platform.isBrowser || this.initialized || !this.platform.isLiffEnvironment) {
      return;
    }

    if (this.initPromise) {
      await this.initPromise;
      return;
    }

    const liffId = this.getLiffId();
    if (!liffId) {
      console.warn('[LIFF] Missing LIFF ID. Set meta[name="liff-id"] or window.LIFF_ID.');
      return;
    }

    this.initPromise = this.runInit(liffId);
    await this.initPromise;
  }

  getInitError(): string | null {
    return this.initError;
  }

  private async runInit(liffId: string): Promise<void> {
    this.initError = null;

    try {
      await liff.init({ liffId, withLoginOnExternalBrowser: false });
      this.initialized = true;
      this.inClient = liff.isInClient();

      if (!this.inClient) {
        this.initError = 'LIFF must be opened inside the LINE app.';
        return;
      }

      this.loggedIn = liff.isLoggedIn();
      if (!this.loggedIn) {
        liff.login({ redirectUri: this.getRedirectUri() });
        return;
      }

      this.accessToken = liff.getAccessToken();
      this.idToken = liff.getIDToken();

      if (!this.accessToken) {
        this.loggedIn = false;
        liff.login({ redirectUri: this.getRedirectUri() });
        return;
      }

      this.profile = await liff.getProfile();
    } catch (error) {
      this.initError = error instanceof Error ? error.message : String(error);
      console.error('[LIFF] init failed', error);
    } finally {
      this.initPromise = null;
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
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

  isInClient(): boolean {
    return this.inClient;
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

  private getRedirectUri(): string {
    const { origin, pathname } = window.location;
    return `${origin}${pathname}`;
  }
}
