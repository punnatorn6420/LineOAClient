import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppHeaderComponent } from './components/app-header.component';
import { AppFooterComponent } from './components/app-footer.component';
import { LayoutSkeletonComponent } from './components/layout-skeleton.component';

@Component({
  selector: 'app-web-layout',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent, LayoutSkeletonComponent],
  template: `
    <div class="min-h-dvh bg-background text-foreground">
      <app-header />

      <main class="mx-auto max-w-6xl px-4 py-6">
        @if (isPageLoading()) {
          <app-layout-skeleton />
        } @else {
          <router-outlet />
        }
      </main>

      <app-footer />
    </div>
  `,
})
export class WebLayoutComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly isPageLoading = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.isPageLoading.set(event instanceof RouteConfigLoadStart);
      });
  }
}
