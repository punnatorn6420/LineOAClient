import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButtonImports } from '@ui/button';
import { HlmInputImports } from '@ui/input';
import { HlmLabelImports } from '@ui/label';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HlmButtonImports, HlmInputImports, HlmLabelImports],
  templateUrl: './booking.component.html',
})
export class BookingComponent {
  readonly passengerTabs = ['Passenger 1', 'Passenger 2', 'Passenger 3', 'Passenger 4'];
  currentPassenger = 1;
  submitted = false;

  readonly titleOptions = ['MR', 'MS', 'MRS', 'MONK', 'MISS'];
  readonly countries = ['Thailand', 'Singapore', 'Japan', 'United States', 'United Kingdom'];

  readonly bookingForm;

  constructor(private readonly fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      title: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      middleName: ['', [Validators.pattern(/^[A-Za-z ]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      dateOfBirth: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      countryOfResidence: ['', [Validators.required]],
      passportNumber: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{6,12}$/)]],
      issuedBy: ['', [Validators.required]],
      passportExpiryDate: ['', [Validators.required]],
      mobileCountryCode: ['+66', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.bookingForm.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.currentPassenger = 2;
  }
}
