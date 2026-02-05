import { Component } from '@angular/core';
import { BookingFormComponent } from './components/booking-form.component';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [BookingFormComponent],
  template: ` <app-booking-form /> `,
})
export class BookingPage {}
