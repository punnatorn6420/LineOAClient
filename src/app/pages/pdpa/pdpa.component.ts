import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { LiffService } from '../../core/services/liff.service';
import { HlmButtonImports } from '@ui/button';
import { HlmCheckboxImports } from '@ui/checkbox';
import { HlmLabelImports } from '@ui/label';

type PdpaSection = {
  titleKey: string;
  paragraphKeys?: string[];
  listKeys?: string[];
};

@Component({
  selector: 'app-pdpa',
  templateUrl: './pdpa.component.html',
  standalone: true,
  imports: [
    HlmCheckboxImports,
    HlmLabelImports,
    HlmButtonImports,
    // ...imports อื่นของคุณ
  ],
})
export class PdpaComponent {
  accepted = false;
  error?: string;

  // ใช้ข้อความ Terms & Conditions / PDPA ตามที่คุณให้มา (TH/EN)
  readonly sections: PdpaSection[] = [
    {
      titleKey: 'PDPA_TC_1_TITLE',
      paragraphKeys: ['PDPA_TC_1_P1'],
    },
    {
      titleKey: 'PDPA_TC_2_TITLE',
      listKeys: ['PDPA_TC_2_L1', 'PDPA_TC_2_L2', 'PDPA_TC_2_L3'],
    },
    {
      titleKey: 'PDPA_TC_3_TITLE',
      listKeys: ['PDPA_TC_3_L1', 'PDPA_TC_3_L2', 'PDPA_TC_3_L3'],
    },
    {
      titleKey: 'PDPA_TC_4_TITLE',
      listKeys: ['PDPA_TC_4_L1', 'PDPA_TC_4_L2', 'PDPA_TC_4_L3'],
    },
    {
      titleKey: 'PDPA_TC_5_TITLE',
      paragraphKeys: ['PDPA_TC_5_P1'],
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly liffService: LiffService,
    private readonly i18n: I18nService,
  ) {}

  t(key: string): string {
    return this.i18n.translate(key);
  }

  onToggleAccepted(ev: Event): void {
    const input = ev.target as HTMLInputElement | null;
    this.accepted = !!input?.checked;
  }

  async onAccept(): Promise<void> {
    localStorage.setItem('pdpaAccepted', 'true');
    await this.router.navigateByUrl('/booking');
  }

  async onDecline(): Promise<void> {
    localStorage.removeItem('pdpaAccepted');

    try {
      await this.liffService.closeWindow();
    } catch {
      await this.router.navigateByUrl('/unsupported');
    }
  }
}
