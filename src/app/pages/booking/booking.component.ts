import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@ui/button';
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

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmButtonImports,
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

  countries: string[] = [];
  nationalities: string[] = [];
  mobileCountryCodes: string[] = ['+66'];

  readonly bookingForm;

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
  ) {
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

  private uniqueSorted(values: string[]): string[] {
    return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
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
