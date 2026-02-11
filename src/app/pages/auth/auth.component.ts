import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isMobile } from '../../core/services/device';
import { LiffService } from '../../core/services/liff.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  loading = true;
  error?: string;

  constructor(
    private readonly router: Router,
    private readonly liffService: LiffService,
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      if (!isMobile()) {
        await this.router.navigateByUrl('/unsupported');
        return;
      }

      await this.liffService.ready();

      if (!(await this.liffService.isLoggedIn())) {
        await this.liffService.login(window.location.href);
        return;
      }

      const profile = await this.liffService.getProfile();
      const idToken = await this.liffService.getIdToken();

      sessionStorage.setItem('lineProfile', JSON.stringify(profile));
      if (idToken) {
        sessionStorage.setItem('lineIdToken', idToken);
      }

      const pdpaAccepted = localStorage.getItem('pdpaAccepted') === 'true';
      await this.router.navigateByUrl(pdpaAccepted ? '/booking' : '/pdpa');
    } catch (error: unknown) {
      this.error = error instanceof Error ? error.message : 'LIFF init/login failed';
    } finally {
      this.loading = false;
    }
  }
}
