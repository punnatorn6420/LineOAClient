import { Component } from '@angular/core';
import { HlmSkeleton } from '@ui/skeleton';

@Component({
  selector: 'app-layout-skeleton',
  standalone: true,
  imports: [HlmSkeleton],
  template: `
    <section class="space-y-4 rounded-xl border border-border bg-card p-6">
      <div hlmSkeleton class="h-7 w-1/3"></div>
      <div hlmSkeleton class="h-4 w-full"></div>
      <div hlmSkeleton class="h-4 w-10/12"></div>
      <div hlmSkeleton class="h-4 w-8/12"></div>
      <div class="grid gap-3 pt-2 md:grid-cols-3">
        <div hlmSkeleton class="h-20 w-full"></div>
        <div hlmSkeleton class="h-20 w-full"></div>
        <div hlmSkeleton class="h-20 w-full"></div>
      </div>
    </section>
  `,
})
export class LayoutSkeletonComponent {}
