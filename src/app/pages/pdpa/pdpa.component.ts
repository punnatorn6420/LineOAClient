import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { LiffService } from '../../core/services/liff.service';

type PdpaSection = {
  titleKey: string;
  paragraphKeys?: string[];
  listKeys?: string[];
};

@Component({
  selector: 'app-pdpa',
  templateUrl: './pdpa.component.html',
})
export class PdpaComponent {
  accepted = false;

  readonly sections: PdpaSection[] = [
    {
      titleKey: 'PDPA_PERSONAL_DATA_TITLE',
      paragraphKeys: ['PDPA_PERSONAL_DATA_DEF', 'PDPA_SENSITIVE_DATA_DEF'],
    },
    {
      titleKey: 'PDPA_COLLECTION_TITLE',
      paragraphKeys: ['PDPA_COLLECTION_INTRO'],
      listKeys: [
        'PDPA_COLLECTION_LIST_1',
        'PDPA_COLLECTION_LIST_2',
        'PDPA_COLLECTION_LIST_3',
        'PDPA_COLLECTION_LIST_4',
        'PDPA_COLLECTION_LIST_5',
        'PDPA_COLLECTION_LIST_6',
        'PDPA_COLLECTION_LIST_7',
        'PDPA_COLLECTION_LIST_8',
      ],
    },
    {
      titleKey: 'PDPA_SENSITIVE_TITLE',
      paragraphKeys: ['PDPA_SENSITIVE_CONTENT'],
      listKeys: [
        'PDPA_SENSITIVE_LIST_1',
        'PDPA_SENSITIVE_LIST_2',
        'PDPA_SENSITIVE_LIST_3',
        'PDPA_SENSITIVE_LIST_4',
        'PDPA_SENSITIVE_LIST_5',
      ],
    },
    {
      titleKey: 'PDPA_PURPOSES_TITLE',
      paragraphKeys: ['PDPA_PURPOSES_INTRO'],
      listKeys: [
        'PDPA_PURPOSES_LIST_1',
        'PDPA_PURPOSES_LIST_2',
        'PDPA_PURPOSES_LIST_3',
        'PDPA_PURPOSES_LIST_4',
        'PDPA_PURPOSES_LIST_5',
        'PDPA_PURPOSES_LIST_6',
        'PDPA_PURPOSES_LIST_7',
        'PDPA_PURPOSES_LIST_8',
        'PDPA_PURPOSES_LIST_9',
        'PDPA_PURPOSES_LIST_10',
        'PDPA_PURPOSES_LIST_11',
        'PDPA_PURPOSES_LIST_12',
        'PDPA_PURPOSES_LIST_13',
        'PDPA_PURPOSES_LIST_14',
        'PDPA_PURPOSES_LIST_15',
      ],
    },
    {
      titleKey: 'PDPA_RIGHTS_TITLE',
      paragraphKeys: ['PDPA_RIGHTS_INTRO'],
      listKeys: [
        'PDPA_RIGHTS_LIST_1',
        'PDPA_RIGHTS_LIST_2',
        'PDPA_RIGHTS_LIST_3',
        'PDPA_RIGHTS_LIST_4',
        'PDPA_RIGHTS_LIST_5',
        'PDPA_RIGHTS_LIST_6',
        'PDPA_RIGHTS_LIST_7',
      ],
    },
    {
      titleKey: 'PDPA_CONTACT_TITLE',
      paragraphKeys: [
        'PDPA_CONTACT_COMPANY',
        'PDPA_CONTACT_ADDRESS',
        'PDPA_CONTACT_DISTRICT',
        'PDPA_CONTACT_PHONE_TH',
        'PDPA_CONTACT_PHONE_INT',
        'PDPA_CONTACT_EMAIL',
      ],
      listKeys: [
        'PDPA_CONTACT_REQUIRED_LIST_1',
        'PDPA_CONTACT_REQUIRED_LIST_2',
        'PDPA_CONTACT_REQUIRED_LIST_3',
      ],
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

  async onCancel(): Promise<void> {
    try {
      if (await this.liffService.isInClient()) {
        await this.liffService.closeWindow();
        return;
      }
    } catch {
      // ignore and fallback to route navigation
    }

    await this.router.navigateByUrl('/entry');
  }
}
