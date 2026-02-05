import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LiffService } from '../core/services/liff.service';
import { PlatformService } from '../core/services/platform.service';

@Component({
  selector: 'app-liff-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-white text-black">
      <header class="border-b border-[#e7e7e7] bg-white px-4 py-2.5">
        <div class="text-center leading-tight">
          <p class="text-[20px] font-bold">Nokair Booking Flight</p>
          <p class="text-[17px] text-[#666]">bookingflight.nokair.com</p>
        </div>
      </header>

      <div class="h-16 bg-[#ffcd00] px-4 py-3">
        <img src="/assets/images/nokair-logo.png" alt="Nok Air logo" class="h-10 w-auto" />
      </div>

      <main class="mx-auto w-full max-w-[430px] px-4 pb-44 pt-5">
        @if (!isLiffEnvironment()) {
          <p class="text-[18px] text-red-600">กรุณาเปิดผ่านแอป LINE เพื่อใช้งาน LIFF</p>
        } @else if (initError()) {
          <p class="text-[18px] text-red-600">LIFF init error: {{ initError() }}</p>
        } @else if (!liffLoggedIn()) {
          <p class="text-[18px] text-[#444]">กำลังตรวจสอบการล็อกอิน LINE...</p>
        } @else {
          <router-outlet />
        }
      </main>
    </div>
  `,
})
export class LiffLayoutComponent implements OnInit {
  protected readonly liffLoggedIn = signal(false);
  protected readonly initError = signal<string | null>(null);
  protected readonly isLiffEnvironment = signal(false);

  constructor(
    private readonly liffService: LiffService,
    private readonly platform: PlatformService,
  ) {}

  ngOnInit(): void {
    this.isLiffEnvironment.set(this.platform.isLiffEnvironment);
    void this.loadLiffStatus();
  }

  private async loadLiffStatus(): Promise<void> {
    await this.liffService.init();
    this.liffLoggedIn.set(this.liffService.isLoggedIn());
    this.initError.set(this.liffService.getInitError());
  }
}
