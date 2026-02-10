import { Component, signal } from '@angular/core';
import { HlmButton } from '@ui/button';
import { HlmCheckbox } from '@ui/checkbox';

@Component({
  selector: 'app-pdpa-page',
  standalone: true,
  imports: [HlmButton, HlmCheckbox],
  template: `
    <section class="mx-auto flex min-h-[calc(100dvh-3rem)] items-center justify-center">
      <article
        class="flex w-full max-w-[420px] flex-col overflow-hidden rounded-xl border border-border bg-white shadow-xl"
      >
        <header class="border-b border-border bg-white px-4 py-3">
          <div class="relative flex items-center justify-center">
            <div class="text-center">
              <h1 class="text-[30px] font-bold leading-tight tracking-tight text-foreground">Nokair Booking Flight</h1>
              <p class="text-sm text-muted-foreground">bookingflight.nokair.com</p>
            </div>

            <button
              type="button"
              aria-label="close"
              class="absolute right-0 top-1/2 -translate-y-1/2 text-4xl leading-none text-foreground/90"
            >
              ×
            </button>
          </div>
        </header>

        <div class="flex items-center gap-3 bg-[#f8c800] px-4 py-4">
          <div
            class="flex h-7 w-7 items-center justify-center rounded-full border border-black/30 bg-white text-[10px] font-bold"
          >
            ☺
          </div>
          <span class="text-3xl font-black tracking-wide text-black">NOK AIR</span>
        </div>

        <div class="flex-1 overflow-y-auto bg-[#efefef] px-6 pb-6 pt-5 text-foreground">
          <h2 class="text-[28px] font-bold leading-tight">ข้อตกลงและเงื่อนไขการใช้บริการ [Terms & Conditions]</h2>

          <ol class="mt-6 space-y-6 text-[24px] leading-9">
            <li>
              <p class="font-bold">1. การใช้บริการ</p>
              <p class="mt-1 text-foreground/90">
                ผู้ใช้งานตกลงว่าจะใช้ระบบจองตั๋วของเราเพื่อวัตถุประสงค์ที่ถูกต้องตามกฎหมาย และไม่กระทำการใด ๆ
                ที่เป็นการละเมิดสิทธิของบุคคลอื่น หรือก่อให้เกิดความเสียหายต่อระบบ
              </p>
            </li>

            <li>
              <p class="font-bold">2. การจองและการชำระเงิน</p>
              <ul class="mt-1 list-disc space-y-1 pl-6 text-foreground/90">
                <li>การจองจะถือว่าสมบูรณ์เมื่อผู้ใช้ได้กรอกข้อมูลครบถ้วนและดำเนินการชำระเงินสำเร็จ</li>
                <li>ระบบจะส่งหมายเลขการจองและรายละเอียดผ่าน LINE หรืออีเมลภายใน 5 นาทีหลังการยืนยันการชำระเงิน</li>
                <li>หากไม่ได้รับการยืนยัน กรุณาติดต่อทีมงานภายใน 24 ชั่วโมง</li>
              </ul>
            </li>

            <li>
              <p class="font-bold">3. การยกเลิกและคืนเงิน</p>
              <ul class="mt-1 list-disc space-y-1 pl-6 text-foreground/90">
                <li>การยกเลิกหรือขอคืนเงินขึ้นอยู่กับเงื่อนไขของสายการบินหรือผู้ให้บริการที่กำหนด</li>
                <li>หากอนุญาตให้คืนเงิน จะหักค่าธรรมเนียมตามที่ระบุไว้ในรายละเอียดการจอง</li>
                <li>บางประเภทตั๋วหรือบริการอาจไม่สามารถคืนเงินได้</li>
              </ul>
            </li>

            <li>
              <p class="font-bold">4. ความเป็นส่วนตัวของข้อมูล [PDPA]</p>
              <ul class="mt-1 list-disc space-y-1 pl-6 text-foreground/90">
                <li>
                  ผู้ใช้ตกลงให้เราจัดเก็บและใช้ข้อมูลส่วนบุคคล เช่น ชื่อ เบอร์โทร อีเมล เพื่อการตกลงจอง
                  และให้บริการตามวัตถุประสงค์
                </li>
                <li>ข้อมูลจะถูกเก็บรักษาอย่างปลอดภัย และไม่เปิดเผยแก่บุคคลภายนอกโดยไม่ได้รับอนุญาต</li>
              </ul>
            </li>
          </ol>
        </div>

        <footer class="space-y-4 border-t border-border bg-white p-4">
          <label class="flex cursor-pointer items-start gap-3 text-base leading-6 text-foreground">
            <hlm-checkbox
              [checked]="isAccepted()"
              (checkedChange)="isAccepted.set($event)"
              class="mt-1 border-[#bcbcbc] data-[state=checked]:border-[#f8c800] data-[state=checked]:bg-[#f8c800] data-[state=checked]:text-black"
            />
            <span>ข้าพเจ้าได้อ่านและเข้าใจข้อกำหนดและเงื่อนไขในการเก็บรวบรวมใช้และเปิดเผย ข้อมูลส่วนบุคคลข้างต้นอย่างชัดเจน</span>
          </label>

          <button
            hlmBtn
            type="button"
            class="h-14 w-full rounded-lg border border-black text-[28px] font-bold"
            [disabled]="!isAccepted()"
            [class.cursor-not-allowed]="!isAccepted()"
            [style.backgroundColor]="isAccepted() ? '#f8c800' : '#dddddd'"
            [style.color]="isAccepted() ? '#000000' : '#9a9a9a'"
            [style.borderColor]="isAccepted() ? '#000000' : '#dddddd'"
          >
            ยินยอม
          </button>
        </footer>
      </article>
    </section>
  `,
})
export class PdpaPage {
  protected readonly isAccepted = signal(false);
}
