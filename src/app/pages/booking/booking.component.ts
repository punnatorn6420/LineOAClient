import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@ui/button';
import { HlmDialog, HlmDialogImports } from '@ui/dialog';
import { HlmFormFieldImports } from '@ui/form-field';
import { HlmInputImports } from '@ui/input';
import { HlmLabelImports } from '@ui/label';
import { HlmSelectImports } from '@ui/select';
import { lucideArrowRight } from '@ng-icons/lucide';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { BottomSheetSelectSheetComponent } from 'src/app/core/components/bottom-sheet-select/bottom-sheet-select.component';
import { BrnSelectBottomSheetTriggerDirective } from 'src/app/core/components/bottom-sheet-select/brn-select-bottom-sheet.directive';
import { HlmDatePicker } from '@ui/date-picker';

interface CountryNationalityPhoneInfo {
  country_en: string;
  code: string;
  phone_code: number | string;
  nationality_en: string;
}

type PassengerFormData = {
  title: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  dateOfBirth: unknown;
  nationality: string | null;
  countryOfResidence: string | null;
  passportNumber: string | null;
  issuedBy: string | null;
  passportExpiryDate: unknown;
  mobileCountryCode: string | null;
  mobileNumber: string | null;
  email: string | null;
};

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmButtonImports,
    HlmDialogImports,
    BrnDialogImports,
    HlmFormFieldImports,
    HlmInputImports,
    HlmLabelImports,
    HlmSelectImports,
    BrnSelectImports,
    NgIcon,
    BrnSelectBottomSheetTriggerDirective,
    BottomSheetSelectSheetComponent,
    HlmDatePicker,
  ],
  templateUrl: './booking.component.html',
  providers: [provideIcons({ lucideArrowRight })],
})
export class BookingComponent implements OnInit {
  @ViewChild('bsSheet') bsSheet!: BottomSheetSelectSheetComponent;
  readonly passengerTabs = ['Passenger 1', 'Passenger 2', 'Passenger 3', 'Passenger 4'];
  readonly titleOptions = ['MR', 'MS', 'MRS', 'MONK', 'MISS'];
  currentPassenger = 1;
  submitted = false;
  private readonly passengerForms: (PassengerFormData | null)[] = Array.from(
    { length: this.passengerTabs.length },
    () => null,
  );
  private readonly completedPassengers: boolean[] = Array.from(
    { length: this.passengerTabs.length },
    () => false,
  );

  countries: string[] = [];
  nationalities: string[] = [];
  mobileCountryCodes: string[] = ['+66'];

  readonly bookingForm;

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    this.bookingForm = this.fb.group({
      title: [null, [Validators.required]],
      firstName: [null, [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      middleName: [null, [Validators.pattern(/^[A-Za-z ]*$/)]],
      lastName: [null, [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      dateOfBirth: [null, [Validators.required]],
      nationality: [null, [Validators.required]],
      countryOfResidence: [null, [Validators.required]],
      passportNumber: [null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{6,12}$/)]],
      issuedBy: [null, [Validators.required]],
      passportExpiryDate: [null, [Validators.required]],
      mobileCountryCode: ['+66', [Validators.required]],
      mobileNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.http
      .get<CountryNationalityPhoneInfo[]>('/assets/country_nationality_phone_info.json')
      .subscribe((data) => {
        this.countries = this.uniqueSorted(data.map((item) => item.country_en));
        this.nationalities = this.uniqueSorted(data.map((item) => item.nationality_en));
        this.mobileCountryCodes = this.uniqueSorted(
          data.map((item) => `+${item.phone_code.toString()}`),
        );
      });

    this.bookingForm.valueChanges.subscribe(() => {
      this.syncCurrentPassengerState();
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

    this.saveCurrentPassenger();
    if (this.currentPassenger < this.passengerTabs.length) {
      this.currentPassenger += 1;
      this.loadPassenger(this.currentPassenger);
    }
  }

  get continueButtonText(): string {
    return this.currentPassenger === this.passengerTabs.length
      ? 'Save Passenger Details'
      : 'Continue to Next Passenger';
  }

  get canConfirm(): boolean {
    return this.completedPassengers.every(Boolean);
  }

  onSelectPassenger(passengerNumber: number): void {
    if (!this.isPassengerUnlocked(passengerNumber)) {
      return;
    }

    this.saveCurrentPassenger();
    this.currentPassenger = passengerNumber;
    this.loadPassenger(passengerNumber);
  }

  isPassengerCompleted(passengerNumber: number): boolean {
    return this.completedPassengers[passengerNumber - 1];
  }

  isPassengerUnlocked(passengerNumber: number): boolean {
    if (passengerNumber === 1) {
      return true;
    }

    return this.completedPassengers[passengerNumber - 2];
  }

  onOpenConfirmDialog(dialog: HlmDialog): void {
    this.submitted = true;
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.saveCurrentPassenger();
    if (!this.canConfirm) {
      return;
    }

    dialog.open();
  }

  onReviewAgain(dialog: HlmDialog): void {
    dialog.close();
  }

  onConfirmPassengers(dialog: HlmDialog): void {
    dialog.close();
    this.router.navigate(['/bundle']);
  }

  private uniqueSorted(values: string[]): string[] {
    return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }

  private saveCurrentPassenger(): void {
    const index = this.currentPassenger - 1;
    this.passengerForms[index] = structuredClone(
      this.bookingForm.getRawValue() as PassengerFormData,
    );
    this.completedPassengers[index] = this.bookingForm.valid;
  }

  private loadPassenger(passengerNumber: number): void {
    const passengerData = this.passengerForms[passengerNumber - 1];
    if (passengerData) {
      this.bookingForm.reset(passengerData as any);
    } else {
      this.bookingForm.reset({
        title: null,
        firstName: null,
        middleName: null,
        lastName: null,
        dateOfBirth: null,
        nationality: null,
        countryOfResidence: null,
        passportNumber: null,
        issuedBy: null,
        passportExpiryDate: null,
        mobileCountryCode: '+66',
        mobileNumber: null,
        email: null,
      } as any);
    }

    this.submitted = false;
    this.bookingForm.markAsUntouched();
    this.syncCurrentPassengerState();
  }

  private syncCurrentPassengerState(): void {
    const index = this.currentPassenger - 1;
    this.passengerForms[index] = structuredClone(
      this.bookingForm.getRawValue() as PassengerFormData,
    );
    this.completedPassengers[index] = this.bookingForm.valid;
  }

  openNationalitySheet = () => {
    const ctrl = this.bookingForm.get('nationality') as FormControl<string | null>;
    this.bsSheet.openFor(ctrl, this.nationalities, 'Nationality');
  };

  openCountryResidenceSheet = () => {
    const ctrl = this.bookingForm.get('countryOfResidence') as FormControl<string | null>;
    this.bsSheet.openFor(ctrl, this.countries, 'Country of residence');
  };

  openIssuedBySheet = () => {
    const ctrl = this.bookingForm.get('issuedBy') as FormControl<string | null>;
    this.bsSheet.openFor(ctrl, this.countries, 'Issued By');
  };

  openMobileCodeSheet = () => {
    const ctrl = this.bookingForm.get('mobileCountryCode') as FormControl<string | null>;
    this.bsSheet.openFor(ctrl, this.mobileCountryCodes, 'Code');
  };
}
