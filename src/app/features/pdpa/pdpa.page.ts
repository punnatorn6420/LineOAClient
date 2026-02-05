import { Component, OnInit, signal } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HlmButton } from '@ui/button';
import { HlmCheckbox } from '@ui/checkbox';
import { LiffService } from '../../core/services/liff.service';
import { PlatformService } from '../../core/services/platform.service';
import { PdpaConsentService } from '../../core/services/pdpa-consent.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-pdpa-page',
  standalone: true,
  imports: [NgClass, NgIf, TranslatePipe, HlmButton, HlmCheckbox],
  templateUrl: './pdpa.page.html',
})
export class PdpaPage implements OnInit {
  protected readonly accepted = signal(false);
  protected readonly liffInitialized = signal(false);
  protected readonly liffLoggedIn = signal(false);
  protected readonly liffDisplayName = signal<string | null>(null);

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly platform: PlatformService,
    private readonly consentService: PdpaConsentService,
    private readonly liffService: LiffService,
  ) {}

  ngOnInit(): void {
    this.accepted.set(this.consentService.getConsent());

    if (this.platform.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    void this.loadLiffStatus();
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

  private async loadLiffStatus(): Promise<void> {
    await this.liffService.init();
    this.liffInitialized.set(this.liffService.isInitialized());
    this.liffLoggedIn.set(this.liffService.isLoggedIn());
    this.liffDisplayName.set(this.liffService.getProfile()?.displayName ?? null);
  }
}
