import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pdpa',
  templateUrl: './pdpa.component.html',
})
export class PdpaComponent {
  accepted = false;

  constructor(private router: Router) {}

  async onAccept() {
    localStorage.setItem('pdpaAccepted', 'true');
    await this.router.navigateByUrl('/booking');
  }

  onCancel() {
    // ถ้าเปิดใน LIFF browser ใน LINE app ปิดหน้าต่างได้
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const liff = (window as any).liff;
      if (liff?.isInClient?.()) {
        liff.closeWindow();
        return;
      }
    } catch {}

    // ถ้าไม่ใช่ใน LINE app ก็กลับไป entry
    this.router.navigateByUrl('/entry');
  }
}
