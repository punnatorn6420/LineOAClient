import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  loading = true;
  error?: string;

  constructor(
    private router: Router,
    // private liffService: LiffService (แล้วแต่ของคุณ)
  ) {}

  async ngOnInit() {
    try {
      // 1) init
      // await this.liff.init({ liffId: environment.liffId });
      // ^ ใช้ของคุณเอง (จาก liff.service.ts)

      // 2) กัน desktop (ถ้าคุณต้องการบังคับมือถือเท่านั้น)
      if (this.isDesktop()) {
        await this.router.navigateByUrl('/unsupported');
        return;
      }

      // 3) login ถ้ายังไม่ login
      if (!this.liff.isLoggedIn()) {
        // สำคัญ: redirectUri ต้องขึ้นต้นด้วย Endpoint URL ที่ตั้งใน Console
        this.liff.login({ redirectUri: window.location.href });
        return;
      }

      // 4) Profile / idToken (ตอนนี้แค่ดึงไว้ก่อน)
      const profile = await this.liff.getProfile();
      const idToken = this.liff.getIDToken(); // ชื่อจริงใน LIFF SDK คือ getIDToken()

      sessionStorage.setItem('lineProfile', JSON.stringify(profile));
      if (idToken) sessionStorage.setItem('lineIdToken', idToken);

      // 5) เช็ค PDPA
      const pdpaAccepted = localStorage.getItem('pdpaAccepted') === 'true';
      await this.router.navigateByUrl(pdpaAccepted ? '/booking' : '/pdpa');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      this.error = e?.message ?? 'LIFF init/login failed';
    } finally {
      this.loading = false;
    }
  }

  // ==== helpers ====
  private isDesktop(): boolean {
    const ua = navigator.userAgent.toLowerCase();
    const isMobileUA = /android|iphone|ipad|ipod/.test(ua);
    const coarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches ?? false;
    return !(isMobileUA || coarsePointer);
  }

  // NOTE: ให้แน่ใจว่าคุณมี this.liff เป็น LIFF object จริง
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private get liff(): any {
    // return this.liffService.liff;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window as any).liff; // ถ้าคุณผูกไว้แบบอื่นให้เปลี่ยน
  }
}
