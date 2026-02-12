import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

type LiffLike = {
  isInClient(): boolean;
  isLoggedIn(): boolean;
  login(arg: { redirectUri: string }): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProfile(): Promise<any>;
  getIDToken(): string | null;
  closeWindow(): void;
};

@Injectable({ providedIn: 'root' })
export class LiffService {
  private readyPromise?: Promise<LiffLike>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ready(): Promise<LiffLike> {
    if (!this.readyPromise) {
      this.readyPromise = this.initialize();
    }
    return this.readyPromise;
  }

  private async initialize(): Promise<LiffLike> {
    if (!this.isBrowser) {
      throw new Error('LIFF is not available on server (SSR).');
    }

    const mod = await import('@line/liff');
    const liff = mod.default;

    await liff.init({ liffId: environment.liffId });
    return liff as unknown as LiffLike;
  }

  async isInClient(): Promise<boolean> {
    const l = await this.ready();
    return l.isInClient();
  }

  async isLoggedIn(): Promise<boolean> {
    const l = await this.ready();
    return l.isLoggedIn();
  }

  async login(redirectUri?: string): Promise<void> {
    const l = await this.ready();
    l.login({ redirectUri: redirectUri ?? window.location.href });
  }

  async getProfile() {
    const l = await this.ready();
    return l.getProfile();
  }

  async getIdToken(): Promise<string | null> {
    const l = await this.ready();
    return l.getIDToken() ?? null;
  }

  async closeWindow(): Promise<void> {
    const l = await this.ready();
    l.closeWindow();
  }
}
