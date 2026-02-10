import { Component } from '@angular/core';

@Component({
  selector: 'app-pdpa-content',
  standalone: true,
  template: `
    <section class="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h1 class="text-2xl font-bold">PDPA Consent</h1>
      <p class="mt-3 text-muted-foreground">
        หน้านี้เป็นตัวอย่าง page ที่แยก component ย่อยชัดเจน
        สามารถต่อยอดเป็นฟอร์มยินยอมจริงได้ทันที.
      </p>

      <ul class="mt-4 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
        <li>แจ้งวัตถุประสงค์ในการเก็บข้อมูล</li>
        <li>ให้สิทธิ์ผู้ใช้งานในการเข้าถึงและแก้ไขข้อมูล</li>
        <li>รองรับการถอนความยินยอมได้ในอนาคต</li>
      </ul>
    </section>
  `,
})
export class PdpaContentComponent {}
