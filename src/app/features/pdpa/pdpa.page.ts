import { Component, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HlmButton } from '@ui/button';
import { PdpaConsentService } from '../../core/services/pdpa-consent.service';
import { PlatformService } from '../../core/services/platform.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-pdpa-page',
  standalone: true,
  imports: [NgClass, TranslatePipe, HlmButton],
  templateUrl: './pdpa.page.html',
})
export class PdpaPage implements OnInit {
  protected readonly accepted = signal(false);

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly consentService: PdpaConsentService,
    private readonly platform: PlatformService,
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
      void this.router.navigate(['../booking'], { relativeTo: this.route });
    }
  }
}
