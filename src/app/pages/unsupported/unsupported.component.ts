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
        <div class="text-xs text-white/60">
          ถ้าจะทดสอบบน Desktop ให้เข้า
          <code>/entry?desktopAuth=1</code>
        </div>

        <div class="bg-white p-4 rounded-xl inline-block">
          <img [src]="qrUrl" alt="QR" class="w-56 h-56" />
        </div>

        <a
          class="inline-flex items-center justify-center w-full rounded-xl bg-yellow-400 text-black py-3 font-semibold"
          [href]="liffUrl"
        >
          Open in LINE
        </a>

        <a
          class="inline-flex items-center justify-center w-full rounded-xl border border-white/30 text-white py-3 font-semibold"
          href="/entry?desktopAuth=1"
        >
          Continue on Desktop (Dev)
        </a>
      </div>
    </div>
  `,
})
export class UnsupportedComponent {
  liffUrl = `https://liff.line.me/${environment.liffId}`;

  qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    this.liffUrl,
  )}`;
}
