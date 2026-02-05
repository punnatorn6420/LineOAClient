import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-web-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-[#f3f4f6] text-black">
      <header class="border-b border-[#e3e5e7] bg-white">
        <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p class="text-[30px] font-bold leading-tight">Nokair Booking Flight</p>
            <p class="text-[20px] text-[#777]">bookingflight.nokair.com</p>
          </div>
        </div>
        <div class="bg-[#ffcd00]">
          <div class="mx-auto flex h-20 w-full max-w-6xl items-center px-6">
            <img src="/assets/images/nokair-logo.png" alt="Nok Air logo" class="h-12 w-auto" />
          </div>
        </div>
      </header>

      <main class="mx-auto w-full max-w-4xl px-6 pb-48 pt-8">
        <router-outlet />
      </main>
    </div>
  `,
})
export class WebLayoutComponent {}
