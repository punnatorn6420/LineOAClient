import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LiffService } from '../../core/services/liff.service';

@Component({
  selector: 'app-pdpa',
  templateUrl: './pdpa.component.html',
})
export class PdpaComponent {
  accepted = false;

  constructor(
    private readonly router: Router,
    private readonly liffService: LiffService,
  ) {}

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
