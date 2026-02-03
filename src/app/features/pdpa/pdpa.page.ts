import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PlatformService } from '../../core/services/platform.service';
import { PdpaConsentService } from '../../core/services/pdpa-consent.service';

interface PdpaSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

@Component({
  selector: 'app-pdpa-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pdpa.page.html',
})
export class PdpaPage implements OnInit {
  protected readonly accepted = signal(false);
  protected readonly sections: PdpaSection[] = [
    {
      title: 'วัตถุประสงค์การเก็บรวบรวมข้อมูลส่วนบุคคล',
      paragraphs: [
        'เราเก็บข้อมูลเพื่อยืนยันตัวตน ให้บริการ และปรับปรุงประสบการณ์ของผู้ใช้งาน',
      ],
      bullets: [
        'การให้บริการและการทำธุรกรรมที่เกี่ยวข้องกับการจอง',
        'การสื่อสารเพื่อการบริการและการแจ้งเตือน',
        'การปฏิบัติตามกฎหมายและข้อกำหนดที่เกี่ยวข้อง',
      ],
    },
    {
      title: 'ข้อมูลอ่อนไหวและการขอความยินยอม',
      paragraphs: [
        'หากจำเป็นต้องใช้ข้อมูลอ่อนไหว เราจะขอความยินยอมเพิ่มเติมและใช้อย่างจำกัด',
      ],
    },
    {
      title: 'การเปิดเผยข้อมูลต่อบุคคลที่สาม',
      paragraphs: [
        'ข้อมูลจะถูกเปิดเผยเท่าที่จำเป็นต่อการให้บริการ หรือเมื่อได้รับความยินยอม',
      ],
      bullets: [
        'ผู้ให้บริการด้านระบบและการชำระเงิน',
        'หน่วยงานกำกับดูแลตามกฎหมาย',
      ],
    },
    {
      title: 'สิทธิของเจ้าของข้อมูล',
      paragraphs: [
        'คุณสามารถเข้าถึง แก้ไข ถอนความยินยอม หรือร้องขอลบข้อมูลได้',
      ],
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly platform: PlatformService,
    private readonly consentService: PdpaConsentService,
  ) {}

  ngOnInit(): void {
    this.accepted.set(this.consentService.getConsent());

    if (this.platform.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleAcceptance(accepted: boolean): void {
    this.accepted.set(accepted);
  }

  confirmConsent(): void {
    const accepted = this.accepted();
    this.consentService.setConsent(accepted);

    if (accepted) {
      void this.router.navigate(['/form']);
    }
  }
}
