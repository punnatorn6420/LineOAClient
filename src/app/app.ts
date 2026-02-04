import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/services/i18n.service';
import { LiffService } from './core/services/liff.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('LineOAClient');

  constructor(
    private readonly i18n: I18nService,
    private readonly liffService: LiffService,
  ) {}

  ngOnInit(): void {
    this.i18n.init();
    void this.liffService.init();
  }
}
