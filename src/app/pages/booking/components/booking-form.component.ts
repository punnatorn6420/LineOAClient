import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  template: `
    <section class="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h1 class="text-2xl font-bold">Booking Page</h1>
      <p class="mt-2 text-muted-foreground">ตัวอย่างโครงหน้า booking ที่พร้อมต่อยอดเป็นฟอร์มจริง.</p>

      <form class="mt-6 grid gap-4 md:grid-cols-2">
        <label class="grid gap-1 text-sm">
          ชื่อผู้ติดต่อ
          <input class="rounded-md border border-input bg-background px-3 py-2" placeholder="เช่น สมชาย" />
        </label>

        <label class="grid gap-1 text-sm">
          เบอร์โทรศัพท์
          <input class="rounded-md border border-input bg-background px-3 py-2" placeholder="08x-xxx-xxxx" />
        </label>

        <label class="grid gap-1 text-sm md:col-span-2">
          รายละเอียดงาน
          <textarea
            rows="4"
            class="rounded-md border border-input bg-background px-3 py-2"
            placeholder="บอกรายละเอียดเพื่อให้ทีมงานเตรียมข้อมูล"
          ></textarea>
        </label>

        <div class="md:col-span-2">
          <button type="button" class="rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground">
            ส่งคำขอจอง
          </button>
        </div>
      </form>
    </section>
  `,
})
export class BookingFormComponent {}
