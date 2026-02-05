import { Component } from '@angular/core';
import { PdpaContentComponent } from './components/pdpa-content.component';

@Component({
  selector: 'app-pdpa-page',
  standalone: true,
  imports: [PdpaContentComponent],
  template: ` <app-pdpa-content /> `,
})
export class PdpaPage {}
