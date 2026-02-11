import { Injectable } from '@angular/core';
import liff from '@line/liff';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LiffService {
  private inited = false;

  async init(): Promise<void> {
    if (this.inited) return;
    await liff.init({ liffId: environment.liffId });
    this.inited = true;
  }

  isInClient(): boolean {
    return liff.isInClient();
  }

  isLoggedIn(): boolean {
    return liff.isLoggedIn();
  }

  login(redirectUri?: string) {
    liff.login({ redirectUri: redirectUri ?? window.location.href });
  }

  async getProfile() {
    return await liff.getProfile();
  }

  getIdToken(): string | null {
    return liff.getIDToken() ?? null;
  }

  closeWindow() {
    liff.closeWindow();
  }
}
