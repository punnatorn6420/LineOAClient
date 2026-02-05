import { Component } from '@angular/core';

@Component({
  selector: 'app-home-feature-list',
  standalone: true,
  template: `
    <section class="mt-6 grid gap-4 md:grid-cols-3">
      @for (item of items; track item.title) {
        <article class="rounded-xl border border-border bg-card p-5">
          <h2 class="text-lg font-semibold">{{ item.title }}</h2>
          <p class="mt-2 text-sm text-muted-foreground">{{ item.description }}</p>
        </article>
      }
    </section>
  `,
})
export class HomeFeatureListComponent {
  protected readonly items = [
    {
      title: 'Page-based structure',
      description: 'แต่ละหน้าอยู่ในโฟลเดอร์ pages ของตัวเอง ลดการผูกกันของโมดูล',
    },
    {
      title: 'Reusable components',
      description: 'องค์ประกอบ UI ถูกแยกย่อยในโฟลเดอร์ components ของแต่ละ page',
    },
    {
      title: 'Shared layout',
      description: 'Header, Footer และ Skeleton loading ใช้ร่วมกันได้ทั้งระบบ',
    },
  ];
}
