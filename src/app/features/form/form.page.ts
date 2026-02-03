import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="card space-y-4">
      <h1 class="text-xl font-semibold text-foreground">ฟอร์มการจอง</h1>
      <p class="text-sm text-muted-foreground">
        หน้านี้จะถูกย้ายจากโปรเจ็คเดิมในขั้นถัดไป ตอนนี้ใช้เพื่อรองรับ flow หลังการยินยอม
        PDPA.
      </p>
      <div class="flex flex-wrap gap-3">
        <a class="btn-primary" routerLink="/web/pdpa">กลับไปหน้า PDPA</a>
        <a class="btn-secondary" routerLink="/liff/pdpa">โหมด LINE</a>
      </div>
    </section>
  `,
})
export class FormPage {}
