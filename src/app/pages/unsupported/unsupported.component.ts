import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-unsupported',
  template: `
    <div
      class="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-neutral-950 text-white"
    >
      <div class="max-w-md w-full space-y-4">
        <div class="text-2xl font-semibold">Supported only on mobile devices.</div>
        <div class="text-white/70">กรุณาเปิดผ่าน LINE บนมือถือ (LIFF)</div>
        <div class="text-xs text-white/60">สำหรับทดสอบบน Desktop ให้เติม <code>?desktopAuth=1</code> ต่อท้าย URL</div>

        <div class="bg-white p-4 rounded-xl inline-block">
          <!-- วิธีง่ายสุด: โชว์เป็นรูป QR จากบริการภายนอก หรือใช้ lib ทำ QR -->
          <img [src]="qrUrl" alt="QR" class="w-56 h-56" />
        </div>

        <a
          class="inline-flex items-center justify-center w-full rounded-xl bg-yellow-400 text-black py-3 font-semibold"
          [href]="liffUrl"
        >
          Open in LINE
        </a>
      </div>
    </div>
  `,
})
export class UnsupportedComponent {
  liffUrl = `https://liff.line.me/${environment.liffId}`;

  // ใช้ image QR แบบง่าย (dev/PoC) — production แนะนำ generate เอง
  qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    this.liffUrl,
  )}`;
}
