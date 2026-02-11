import { Injectable } from '@angular/core';
import liff, { type Liff } from '@line/liff';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LiffService {
  private readyPromise?: Promise<Liff>;

  ready(): Promise<Liff> {
    if (!this.readyPromise) {
      this.readyPromise = this.initialize();
    }

    return this.readyPromise;
  }

  private async initialize(): Promise<Liff> {
    await liff.init({ liffId: environment.liffId });
    return liff;
  }

  async isInClient(): Promise<boolean> {
    const liffInstance = await this.ready();
    return liffInstance.isInClient();
  }

  async isLoggedIn(): Promise<boolean> {
    const liffInstance = await this.ready();
    return liffInstance.isLoggedIn();
  }

  async login(redirectUri?: string): Promise<void> {
    const liffInstance = await this.ready();
    liffInstance.login({ redirectUri: redirectUri ?? window.location.href });
  }

  async getProfile() {
    const liffInstance = await this.ready();
    return liffInstance.getProfile();
  }

  async getIdToken(): Promise<string | null> {
    const liffInstance = await this.ready();
    return liffInstance.getIDToken() ?? null;
  }

  async closeWindow(): Promise<void> {
    const liffInstance = await this.ready();
    liffInstance.closeWindow();
  }
}
