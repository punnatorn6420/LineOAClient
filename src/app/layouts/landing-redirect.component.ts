import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformService } from '../core/services/platform.service';

@Component({
  selector: 'app-landing-redirect',
  standalone: true,
  template: `
    <div class="layout-page">
      <div class="layout-content">
        <div class="card">กำลังนำทางไปยังหน้าที่เหมาะสม...</div>
      </div>
    </div>
  `,
})
export class LandingRedirectComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly platform: PlatformService,
  ) {}

  ngOnInit(): void {
    const target = this.platform.isLiffEnvironment ? '/liff' : '/web';
    void this.router.navigateByUrl(target);
  }
}
