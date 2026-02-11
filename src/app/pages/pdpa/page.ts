import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PdpaConsentService } from '../../core/services/pdpa-consent.service';
import { PlatformService } from '../../core/services/platform.service';
import { PdpaContent } from './components/pdpa-content';

@Component({
  selector: 'app-pdpa-page',
  standalone: true,
  imports: [PdpaContent],
  template: `
    <div class="min-h-screen bg-white text-black">
      <div class="h-16 bg-[#ffcd00] px-4 py-3">
        <img src="/assets/images/nokair-logo.png" alt="Nok Air logo" class="h-10 w-auto" />
      </div>

      <main class="mx-auto w-full max-w-[430px] px-4 pb-44 pt-5">
        <app-pdpa-content
          [accepted]="accepted()"
          (acceptedChange)="toggleAcceptance($event)"
          (confirm)="confirmConsent()"
        />
      </main>
    </div>
  `,
})
export class PdpaPage implements OnInit {
  protected readonly accepted = signal(false);

  constructor(
    private readonly router: Router,
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
      void this.router.navigateByUrl('/booking');
    }
  }
}
