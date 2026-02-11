import { Component, computed, inject } from '@angular/core';
import { HlmCard } from '@ui/card';
import { PlatformService } from '../../../core/services/platform.service';

@Component({
  selector: 'app-landing-content',
  standalone: true,
  imports: [HlmCard],
  template: `
    <section hlmCard class="space-y-5 border bg-white p-6 shadow-sm">
      <h1 class="text-2xl font-bold leading-tight text-slate-900">เปิดหน้านี้ผ่าน LINE OA บนมือถือเท่านั้น</h1>
      <p class="text-base text-slate-600">
        ระบบนี้เป็น LIFF app ที่ต้องยืนยันตัวตนด้วยบัญชี LINE ภายในแอป LINE เท่านั้น เพื่อความถูกต้องและความปลอดภัยของผู้ใช้งาน
      </p>
      <div class="rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
        <p>วิธีเข้าใช้งาน:</p>
        <ol class="mt-2 list-decimal space-y-1 pl-5">
          <li>เปิด LINE บนโทรศัพท์มือถือ</li>
          <li>เข้า Official Account ของคุณ</li>
          <li>กดเมนูเพื่อเปิด LIFF app</li>
          <li>หากอยู่บนคอม ให้สแกน QR code ด้านล่างด้วยมือถือ</li>
        </ol>
      </div>

      <div class="flex flex-col items-center gap-3">
        <img class="h-56 w-56 rounded-xl border bg-white p-2" [src]="qrCodeUrl()" alt="QR code to open LIFF" />
        <p class="text-xs text-slate-500">สแกนเพื่อเปิดหน้าเข้าใช้งานจากโทรศัพท์</p>
      </div>

      @if (platform.isLineUserAgent) {
        <p class="rounded-md bg-amber-50 p-3 text-sm text-amber-700">
          คุณเปิดผ่าน LINE แล้ว แต่ไม่ได้อยู่ใน LIFF context กรุณากลับไปเปิดจากเมนู OA โดยตรง
        </p>
      }
    </section>
  `,
})
export class LandingContent {
  protected readonly platform = inject(PlatformService);
  protected readonly qrCodeUrl = computed(() => {
    const origin = this.platform.isBrowser ? window.location.origin : 'https://line.me';
    const target = encodeURIComponent(origin);
    return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${target}`;
  });
}
