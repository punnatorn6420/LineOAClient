import { Component } from '@angular/core';
import { HomeHeroComponent } from './components/home-hero.component';
import { HomeFeatureListComponent } from './components/home-feature-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeHeroComponent, HomeFeatureListComponent],
  template: `
    <app-home-hero />
    <app-home-feature-list />
  `,
})
export class HomePage {}
