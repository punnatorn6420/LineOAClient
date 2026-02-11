import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformService } from '../../core/services/platform.service';

@Component({
  selector: 'app-entry-page',
  standalone: true,
  template: `
    <div class="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <p class="text-center text-base text-slate-600">กำลังตรวจสอบช่องทางการเข้าใช้งาน...</p>
    </div>
  `,
})
export class EntryPage implements OnInit {
  private readonly router = inject(Router);
  private readonly platform = inject(PlatformService);

  ngOnInit(): void {
    const nextRoute = this.platform.isLiffEnvironment ? '/callback' : '/landing';
    void this.router.navigateByUrl(nextRoute, { replaceUrl: true });
  }
}
