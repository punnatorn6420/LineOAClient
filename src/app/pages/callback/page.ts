import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback-page',
  standalone: true,
  template: `
    <div class="flex min-h-screen items-center justify-center bg-white px-4">
      <p class="text-center text-base text-slate-600">กำลังยืนยันตัวตน LINE... กรุณารอสักครู่</p>
    </div>
  `,
})
export class CallbackPage implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    void this.router.navigateByUrl('/pdpa', { replaceUrl: true });
  }
}
