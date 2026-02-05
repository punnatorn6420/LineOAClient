import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-web-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-[#232323] md:px-4 md:py-6">
      <div class="mx-auto min-h-screen w-full max-w-[390px] bg-white md:min-h-[780px] md:rounded-sm md:shadow-2xl">
        <header class="border-b border-[#e7e7e7] px-4 py-2.5">
          <div class="text-center leading-tight">
            <p class="text-[20px] font-bold">Nokair Booking Flight</p>
            <p class="text-[17px] text-[#666]">bookingflight.nokair.com</p>
          </div>
        </header>

        <div class="h-16 bg-[#ffcd00] px-4 py-3">
          <img src="/assets/images/nokair-logo.png" alt="Nok Air logo" class="h-10 w-auto" />
        </div>

        <main class="px-4 pb-44 pt-5">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class WebLayoutComponent {}
