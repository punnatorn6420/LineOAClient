import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-border bg-secondary/30">
      <div class="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {{ currentYear }} Line OA Client</p>
        <p>Built with scalable page/component/shared architecture.</p>
      </div>
    </footer>
  `,
})
export class AppFooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
