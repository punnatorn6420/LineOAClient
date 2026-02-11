import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { HlmButton } from '@ui/button';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-pdpa-content',
  standalone: true,
  imports: [NgClass, TranslatePipe, HlmButton],
  template: `
    <section class="space-y-5 text-[20px] leading-[1.35] text-black">
      <h1 class="text-[42px] font-bold leading-[1.1]">ข้อตกลงและเงื่อนไขการใช้บริการ [Terms & Conditions]</h1>

      <section class="space-y-1.5">
        <h2 class="text-[34px] font-bold">1. การใช้บริการ</h2>
        <ul class="list-disc space-y-1 pl-7">
          <li>ผู้ใช้งานตกลงว่าจะใช้ระบบจองตั๋วอย่างเที่ยงตรงเพื่อวัตถุประสงค์ตามกฎหมาย และไม่แสวงหาผลประโยชน์ที่ไม่เหมาะสม</li>
          <li>ห้ามกระทำการที่อาจกระทบต่อเสถียรภาพ ความปลอดภัย หรือข้อมูลของระบบ</li>
        </ul>
      </section>

      <section class="space-y-1.5">
        <h2 class="text-[34px] font-bold">2. การจองและการชำระเงิน</h2>
        <ul class="list-disc space-y-1 pl-7">
          <li>การจองจะถือว่าสมบูรณ์เมื่อผู้ใช้งานกรอกข้อมูลครบถ้วนและดำเนินการชำระเงินสำเร็จ</li>
          <li>ระบบจะยืนยันรายละเอียดการจองผ่าน LINE หรืออีเมลภายใน 5 นาทีหลังชำระเงิน</li>
          <li>หากไม่ได้รับการยืนยัน กรุณาติดต่อทีมงานภายใน 24 ชั่วโมง</li>
        </ul>
      </section>

      <section class="space-y-1.5">
        <h2 class="text-[34px] font-bold">3. การยกเลิกและคืนเงิน</h2>
        <ul class="list-disc space-y-1 pl-7">
          <li>การยกเลิกหรือคืนเงินเป็นไปตามเงื่อนไขของสายการบินและผู้ให้บริการที่เกี่ยวข้อง</li>
          <li>หากอนุญาตให้คืนเงิน ระบบจะดำเนินการตามระยะเวลาที่ระบุไว้ในรายละเอียดการจอง</li>
          <li>บางประเภทบริการอาจไม่สามารถคืนเงินได้</li>
        </ul>
      </section>

      <section class="space-y-1.5">
        <h2 class="text-[34px] font-bold">4. ความเป็นส่วนตัวของข้อมูล [PDPA]</h2>
        <ul class="list-disc space-y-1 pl-7">
          <li>ผู้ใช้งานให้ความยินยอมให้จัดเก็บข้อมูลส่วนบุคคล เช่น ชื่อ เบอร์โทร และอีเมล เพื่อการติดต่อและให้บริการตามวัตถุประสงค์</li>
          <li>ข้อมูลอาจถูกเปิดเผยเท่าที่จำเป็นให้กับพันธมิตรที่เกี่ยวข้องกับการให้บริการ</li>
          <li>ผู้ใช้งานสามารถเพิกถอนความยินยอมได้ตามช่องทางที่บริษัทกำหนด</li>
        </ul>
      </section>
    </section>

    <div class="fixed bottom-0 left-0 right-0 z-20 border-t border-[#dcdcdc] bg-white/95 backdrop-blur">
      <div class="mx-auto w-full max-w-[390px] space-y-3 px-4 py-3">
        <label class="flex items-start gap-3 text-[26px] leading-tight text-[#333]">
          <input
            type="checkbox"
            class="mt-1 h-6 w-6 shrink-0 accent-[#ffcd00]"
            [checked]="accepted"
            (change)="acceptedChange.emit($any($event.target).checked)"
          />
          <span>{{ 'PDPA_ACCEPT_TEXT' | translate }}</span>
        </label>

        <button
          hlmBtn
          type="button"
          size="lg"
          class="h-14 w-full rounded-md border text-[30px] font-bold"
          [ngClass]="accepted ? '!border-black !bg-[#ffcd00] !text-black' : '!border-transparent !bg-[#d9d9d9] !text-[#7f7f7f]'"
          [disabled]="!accepted"
          (click)="confirm.emit()"
        >
          {{ 'PDPA_CONFIRM_BUTTON' | translate }}
        </button>
      </div>
    </div>
  `,
})
export class PdpaContent {
  @Input({ required: true }) accepted = false;
  @Output() readonly acceptedChange = new EventEmitter<boolean>();
  @Output() readonly confirm = new EventEmitter<void>();
}
