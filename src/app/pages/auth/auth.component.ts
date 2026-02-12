import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import {
  canUseDesktopAuthForDevelopment,
  isMobileOrSmallViewport,
} from '../../core/services/device';
import { LiffService } from '../../core/services/liff.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  loading = true;
  error?: string;
  private isBrowser = false;

  constructor(
    private readonly router: Router,
    private readonly liffService: LiffService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  async ngOnInit(): Promise<void> {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // SSR: อย่าทำ flow auth ใด ๆ บน server
    if (!this.isBrowser) {
      this.loading = false;
      return;
    }

    try {
      const allowDesktopDev = canUseDesktopAuthForDevelopment();
      const allowByViewport = isMobileOrSmallViewport();

      // เดสก์ท็อปจอใหญ่ และไม่ได้เปิด dev mode → ไป unsupported
      if (!allowByViewport && !allowDesktopDev) {
        await this.router.navigateByUrl('/unsupported');
        return;
      }

      // ✅ Desktop Dev Mode: mock auth (ไม่ใช้ LIFF / ไม่ redirect LINE)
      if (allowDesktopDev) {
        const mockProfile = {
          userId: 'DEV_USER',
          displayName: 'Dev Mode',
          pictureUrl: '',
          statusMessage: 'desktopAuth=1',
        };

        sessionStorage.setItem('lineProfile', JSON.stringify(mockProfile));
        sessionStorage.setItem('lineIdToken', 'DEV_ID_TOKEN');

        const pdpaAccepted = localStorage.getItem('pdpaAccepted') === 'true';
        await this.router.navigateByUrl(pdpaAccepted ? '/booking' : '/pdpa');
        return;
      }

      // ✅ โหมดมือถือ/จอเล็ก: พยายามใช้ LIFF จริง
      await this.liffService.ready();

      // ถ้าอยู่นอก LINE client แล้วอยากแค่ inspect UI:
      // จะไม่ login LINE (กันวน/กันเพี้ยน)
      const inClient = await this.liffService.isInClient();
      if (!inClient) {
        // แนะนำ: ให้ไป /unsupported หรือทำ mock ได้
        await this.router.navigateByUrl('/unsupported');
        return;
      }

      if (!(await this.liffService.isLoggedIn())) {
        // คุม redirectUri ให้กลับมาที่ entry เสมอ (ไม่หลุด param)
        await this.liffService.login(`${window.location.origin}/entry`);
        return;
      }

      const profile = await this.liffService.getProfile();
      const idToken = await this.liffService.getIdToken();

      sessionStorage.setItem('lineProfile', JSON.stringify(profile));
      if (idToken) sessionStorage.setItem('lineIdToken', idToken);

      const pdpaAccepted = localStorage.getItem('pdpaAccepted') === 'true';
      await this.router.navigateByUrl(pdpaAccepted ? '/booking' : '/pdpa');
    } catch (e: unknown) {
      this.error = e instanceof Error ? e.message : 'LIFF init/login failed';
    } finally {
      this.loading = false;
    }
  }
}
