import { Injectable } from '@angular/core';

const PDPA_KEY = 'nokair_pdpa_accepted_v1';

@Injectable({ providedIn: 'root' })
export class PdpaService {
  hasAccepted(): boolean {
    return localStorage.getItem(PDPA_KEY) === 'true';
  }

  accept(): void {
    localStorage.setItem(PDPA_KEY, 'true');
    localStorage.setItem(`${PDPA_KEY}_at`, new Date().toISOString());
  }

  revoke(): void {
    localStorage.removeItem(PDPA_KEY);
    localStorage.removeItem(`${PDPA_KEY}_at`);
  }

  acceptedAt(): string | null {
    return localStorage.getItem(`${PDPA_KEY}_at`);
  }
}
