import { Component, OnInit, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LiffService } from '../core/services/liff.service';
import { PlatformService } from '../core/services/platform.service';

@Component({
  selector: 'app-liff-layout',
  standalone: true,
  imports: [NgIf, RouterOutlet],
  template: `
    <div class="min-h-screen bg-[#f5f5f5] text-foreground">
      <header class="flex h-16 items-center bg-[#FCCD01] px-4">
        <div class="w-24">
          <img
            src="/assets/images/nokair-logo.png"
            alt="Nok Air logo"
            class="h-full w-full object-cover"
          />
        </div>
      </header>
      <main class="mx-auto w-full max-w-3xl px-4 py-8 pb-44">
        <section
          *ngIf="!isLiffEnvironment()"
          class="rounded-xl border border-border bg-white/90 p-4 text-[18px] text-foreground shadow-sm"
        >
          <p class="font-semibold">LINE LIFF status</p>
          <p class="text-muted-foreground">
            กรุณาเปิดผ่านแอป LINE ด้วยลิงก์ LIFF เท่านั้น (https://liff.line.me/&lt;LIFF_ID&gt;)
          </p>
        </section>

        <section
          *ngIf="isLiffEnvironment() && initError()"
          class="rounded-xl border border-border bg-white/90 p-4 text-[18px] text-foreground shadow-sm"
        >
          <p class="font-semibold">LINE LIFF status</p>
          <p class="text-red-600">LIFF init error: {{ initError() }}</p>
          <p class="text-muted-foreground">
            ตรวจสอบว่าได้ตั้งค่า LIFF URL และ LIFF ID ใน LINE Developers ให้ตรงกับโดเมนนี้แล้ว
          </p>
          <p *ngIf="isDeveloperRoleError()" class="text-muted-foreground">
            ช่อง LINE OA นี้ยังอยู่สถานะ Developing ต้องเพิ่มผู้ใช้เป็น Developer/Tester หรือเปลี่ยน
            Channel status เป็น Published เพื่อให้ผู้ใช้ทั่วไปเข้าได้
          </p>
        </section>

        <section
          *ngIf="isLiffEnvironment() && !initError() && !liffLoggedIn()"
          class="rounded-xl border border-border bg-white/90 p-4 text-[18px] text-foreground shadow-sm"
        >
          <p class="font-semibold">LINE LIFF status</p>
          <p class="text-muted-foreground">
            ระบบกำลังพาไปล็อกอิน LINE LIFF หากยังไม่ล็อกอิน โปรดเปิดผ่านลิงก์ LIFF ในแอป LINE
            อีกครั้ง
          </p>
        </section>

        <router-outlet *ngIf="liffLoggedIn()" />
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

  protected isDeveloperRoleError(): boolean {
    const message = this.initError();
    return message ? /developing status|developer role/i.test(message) : false;
  }
}
