import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PlatformService } from '../../core/services/platform.service';
import { PdpaConsentService } from '../../core/services/pdpa-consent.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

interface PdpaSection {
  titleKey: string;
  paragraphs?: string[];
  bullets?: string[];
}

@Component({
  selector: 'app-pdpa-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './pdpa.page.html',
})
export class PdpaPage implements OnInit {
  protected readonly accepted = signal(false);
  protected readonly sections: PdpaSection[] = [
    {
      titleKey: 'pdpa.sections.purpose.title',
      paragraphs: [
        'pdpa.sections.purpose.paragraphs.0',
      ],
      bullets: [
        'pdpa.sections.purpose.bullets.0',
        'pdpa.sections.purpose.bullets.1',
        'pdpa.sections.purpose.bullets.2',
      ],
    },
    {
      titleKey: 'pdpa.sections.sensitive.title',
      paragraphs: [
        'pdpa.sections.sensitive.paragraphs.0',
      ],
    },
    {
      titleKey: 'pdpa.sections.disclosure.title',
      paragraphs: [
        'pdpa.sections.disclosure.paragraphs.0',
      ],
      bullets: [
        'pdpa.sections.disclosure.bullets.0',
        'pdpa.sections.disclosure.bullets.1',
      ],
    },
    {
      titleKey: 'pdpa.sections.rights.title',
      paragraphs: [
        'pdpa.sections.rights.paragraphs.0',
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
