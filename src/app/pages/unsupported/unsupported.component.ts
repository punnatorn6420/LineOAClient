import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-unsupported',
  templateUrl: './unsupported.component.html',
})
export class UnsupportedComponent implements OnInit {
  liffUrl = '';
  qrUrl = '';
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // SSR: อย่าทำอะไรที่แตะ window
    if (!this.isBrowser) return;

    this.liffUrl = `https://liff.line.me/${environment.liffId}`;
    this.qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
      this.liffUrl,
    )}`;
  }
}
