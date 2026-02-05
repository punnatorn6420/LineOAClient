import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@ui/button';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [RouterLink, HlmButton],
  template: `
    <section class="rounded-2xl border border-border bg-card p-6 md:p-8">
      <p class="text-sm font-semibold uppercase tracking-wide text-primary">Line OA Platform</p>
      <h1 class="mt-2 text-3xl font-bold text-foreground md:text-4xl">โครงสร้างใหม่แบบ Page + Components</h1>
      <p class="mt-3 max-w-3xl text-muted-foreground">
        ระบบถูกปรับให้เป็นมาตรฐาน แยกหน้าออกจากองค์ประกอบย่อย และมี shared layout กลางสำหรับ header, footer และ skeleton loading
        พร้อมรองรับการขยายระบบในอนาคต.
      </p>

      <div class="mt-6 flex flex-wrap gap-3">
        <a hlmBtn routerLink="/booking">เริ่มจองคิว</a>
        <a hlmBtn variant="outline" routerLink="/pdpa">อ่านข้อตกลง PDPA</a>
      </div>
    </section>
  `,
})
export class HomeHeroComponent {}
