import { Component, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { HlmButton } from '@ui/button';
import { HlmCheckbox } from '@ui/checkbox';
import { PlatformService } from '../../core/services/platform.service';
import { PdpaConsentService } from '../../core/services/pdpa-consent.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-pdpa-page',
  standalone: true,
  imports: [NgClass, TranslatePipe, HlmButton, HlmCheckbox],
  templateUrl: './pdpa.page.html',
})
export class PdpaPage implements OnInit {
  protected readonly accepted = signal(false);

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
