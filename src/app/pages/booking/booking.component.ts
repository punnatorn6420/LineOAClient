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
import { lucideArrowRight, lucideCheckCircle2 } from '@ng-icons/lucide';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { BottomSheetSelectSheetComponent } from 'src/app/core/components/bottom-sheet-select/bottom-sheet-select.component';
import { BrnSelectBottomSheetTriggerDirective } from 'src/app/core/components/bottom-sheet-select/brn-select-bottom-sheet.directive';
import { HlmDatePicker } from '@ui/date-picker';
import { BrnCheckboxImports } from '@spartan-ng/brain/checkbox';
import { HlmCheckboxImports } from '@ui/checkbox';

interface CountryNationalityPhoneInfo {
  country_en: string;
  code: string;
  phone_code: number | string;
  nationality_en: string;
}

/** -----------------------------
 *  ✅ Bundle models + mock data
 *  ----------------------------- */
type TripDirection = 'OUTBOUND' | 'INBOUND';
type BundleCode = 'B1' | 'B2' | 'B3' | 'B4' | 'B5';

type BundleItem = {
  code: BundleCode;
  titleTh: string;
  iconUrl: string; // ใช้ path รูปของคุณ
  sale: number;
  original: number;
  discountPercent: number; // -15
  descriptions: string[];
};

type BundleSection = {
  direction: TripDirection;
  titleTh: string; // "เลือก Bundle — ขาไป"
  subtitleEn: string; // "Optional service"
  bundles: BundleItem[];
};

const BUNDLE_SECTIONS_MOCK: BundleSection[] = [
  {
    direction: 'OUTBOUND',
    titleTh: 'เลือก Bundle — ขาไป',
    subtitleEn: 'Optional service',
    bundles: [
      {
        code: 'B1',
        titleTh: 'ที่นั่ง + บอร์ดดิ้ง',
        iconUrl: '/assets/images/bundle-seat.png',
        sale: 536.0,
        original: 679.0,
        discountPercent: 15,
        descriptions: ['เลือกที่นั่งได้ตามใจ', 'สิทธิ์บินขึ้นก่อนเข้าคิวก่อนเปลี่ยนแผน'],
      },
      {
        code: 'B2',
        titleTh: 'กระเป๋า + บอร์ดดิ้ง',
        iconUrl: '/assets/images/bundle-baggage.png',
        sale: 595.0,
        original: 700.0,
        discountPercent: 15,
        descriptions: ['น้ำหนักกระเป๋า 20 kg', 'สิทธิ์บินขึ้นก่อนเข้าคิวก่อนเปลี่ยนแผน'],
      },
      {
        code: 'B3',
        titleTh: 'กระเป๋า + ที่นั่ง',
        iconUrl: '/assets/images/bundle-baggage.png',
        sale: 722.5,
        original: 850.0,
        discountPercent: 15,
        descriptions: ['น้ำหนักกระเป๋า 20 kg', 'สิทธิ์บินขึ้นก่อนเข้าคิวก่อนเปลี่ยนแผน'],
      },
      {
        code: 'B4',
        titleTh: 'กระเป๋า + ที่นั่ง + บอร์ดดิ้ง',
        iconUrl: '/assets/images/bundle-combo.png',
        sale: 892.5,
        original: 1050.0,
        discountPercent: 15,
        descriptions: [
          'น้ำหนักกระเป๋า 20 kg',
          'เลือกที่นั่งได้ตามใจ',
          'สิทธิ์บินขึ้นก่อนเข้าคิวก่อนเปลี่ยนแผน',
        ],
      },
      {
        code: 'B5',
        titleTh: 'กระเป๋า + ที่นั่ง + ห้องรับรองพิเศษ',
        iconUrl: '/assets/images/bundle-lounge.png',
        sale: 1232.5,
        original: 1450.0,
        discountPercent: 15,
        descriptions: [
          'น้ำหนักกระเป๋า 20 kg',
          'เลือกที่นั่งได้ตามใจ',
          'สัมผัสประสบการณ์เหนือระดับ กับสิทธิ์เข้าลาวน์จพิเศษ',
        ],
      },
    ],
  },

  // INBOUND เหมือน OUTBOUND ก็ได้ หรือปรับเอง
  {
    direction: 'INBOUND',
    titleTh: 'เลือก Bundle — ขากลับ',
    subtitleEn: 'Optional service',
    bundles: [
      {
        code: 'B1',
        titleTh: 'ที่นั่ง + บอร์ดดิ้ง',
        iconUrl: '/assets/images/bundle-seat.png',
        sale: 536.0,
        original: 679.0,
        discountPercent: 15,
        descriptions: ['เลือกที่นั่งได้ตามใจ', 'สิทธิ์บินขึ้นก่อนเข้าคิวก่อนเปลี่ยนแผน'],
      },
      {
        code: 'B2',
        titleTh: 'กระเป๋า + บอร์ดดิ้ง',
        iconUrl: '/assets/images/bundle-baggage.png',
        sale: 595.0,
        original: 700.0,
        discountPercent: 15,
        descriptions: ['น้ำหนักกระเป๋า 20 kg', 'สิทธิ์บินขึ้นก่อนเข้าคิวก่อนเปลี่ยนแผน'],
      },
      {
        code: 'B3',
        titleTh: 'กระเป๋า + ที่นั่ง',
        iconUrl: '/assets/images/bundle-baggage.png',
        sale: 722.5,
        original: 850.0,
        discountPercent: 15,
        descriptions: ['น้ำหนักกระเป๋า 20 kg', 'สิทธิ์บินขึ้นก่อนเข้าคิวก่อนเปลี่ยนแผน'],
      },
      {
        code: 'B4',
        titleTh: 'กระเป๋า + ที่นั่ง + บอร์ดดิ้ง',
        iconUrl: '/assets/images/bundle-combo.png',
        sale: 892.5,
        original: 1050.0,
        discountPercent: 15,
        descriptions: [
          'น้ำหนักกระเป๋า 20 kg',
          'เลือกที่นั่งได้ตามใจ',
          'สิทธิ์บินขึ้นก่อนเข้าคิวก่อนเปลี่ยนแผน',
        ],
      },
      {
        code: 'B5',
        titleTh: 'กระเป๋า + ที่นั่ง + ห้องรับรองพิเศษ',
        iconUrl: '/assets/images/bundle-lounge.png',
        sale: 1232.5,
        original: 1450.0,
        discountPercent: 15,
        descriptions: [
          'น้ำหนักกระเป๋า 20 kg',
          'เลือกที่นั่งได้ตามใจ',
          'สัมผัสประสบการณ์เหนือระดับ กับสิทธิ์เข้าลาวน์จพิเศษ',
        ],
      },
    ],
  },
];

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

  // ✅ เพิ่มตามดีไซน์
  outboundBundle: BundleCode | null;
  inboundBundle: BundleCode | null;

  specialAssistEnabled?: boolean;
  specialAssist?: {
    visualImpairment?: boolean;
    hearingImpairment?: boolean;
    monk?: boolean;
    nun?: boolean;
    pregnant?: boolean;
    wheelchair?: boolean;
    unaccompaniedMinor?: boolean;
    other?: boolean;
  };
  specialAssistOther?: string | null;
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
    BrnCheckboxImports,
    HlmCheckboxImports,
  ],
  templateUrl: './booking.component.html',
  providers: [provideIcons({ lucideArrowRight, lucideCheckCircle2 })],
})
export class BookingComponent implements OnInit {
  @ViewChild('bsSheet') bsSheet!: BottomSheetSelectSheetComponent;

  readonly passengerTabs = ['Passenger 1', 'Passenger 2'];
  readonly titleOptions = ['MR', 'MS', 'MRS', 'MONK', 'MISS'];

  // ✅ bundle sections ให้ template ใช้
  readonly bundleSections = BUNDLE_SECTIONS_MOCK;

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

      // ✅ เพิ่มตามดีไซน์ (Optional)
      outboundBundle: [null as BundleCode | null],
      inboundBundle: [null as BundleCode | null],

      specialAssistEnabled: [false],

      // ✅ ตัวเลือกย่อย
      specialAssist: this.fb.group({
        visualImpairment: [false], // ผู้บกพร่องทางสายตา/ตาบอด
        hearingImpairment: [false], // ผู้บกพร่องทางการได้ยิน/หูหนวก
        monk: [false], // พระภิกษุ
        nun: [false], // แม่ชี
        pregnant: [false], // สตรีตั้งครรภ์
        wheelchair: [false], // รถเข็น วีลแชร์
        unaccompaniedMinor: [false], // เด็กเดินทางคนเดียว
        other: [false], // อื่นๆ
      }),

      // ✅ ช่องกรอก “โปรดระบุ”
      specialAssistOther: [{ value: null, disabled: true }],
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

    const enabledCtrl = this.bookingForm.get('specialAssistEnabled') as FormControl<boolean>;
    const otherCtrl = this.bookingForm.get('specialAssist.other') as FormControl<boolean>;
    const otherTextCtrl = this.bookingForm.get('specialAssistOther') as FormControl<string | null>;

    // ✅ เปิด/ปิดทั้งกลุ่ม
    enabledCtrl.valueChanges.subscribe((enabled) => {
      const group = this.bookingForm.get('specialAssist');
      if (!enabled) {
        group?.reset({
          visualImpairment: false,
          hearingImpairment: false,
          monk: false,
          nun: false,
          pregnant: false,
          wheelchair: false,
          unaccompaniedMinor: false,
          other: false,
        });
        otherTextCtrl.reset(null);
        otherTextCtrl.disable({ emitEvent: false });
      }
    });

    // ✅ เปิดช่อง “โปรดระบุ” เฉพาะตอนติ๊ก อื่นๆ
    otherCtrl.valueChanges.subscribe((checked) => {
      if (checked && enabledCtrl.value) {
        otherTextCtrl.enable({ emitEvent: false });
      } else {
        otherTextCtrl.reset(null);
        otherTextCtrl.disable({ emitEvent: false });
      }
    });
  }

  // ✅ ใช้โชว์ราคาแบบ 1,232.50
  formatTHB(value: number): string {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // ✅ click เลือก bundle
  selectBundle(direction: TripDirection, code: BundleCode): void {
    const controlName = direction === 'OUTBOUND' ? 'outboundBundle' : 'inboundBundle';
    const current = this.bookingForm.get(controlName)?.value as BundleCode | null;

    // คลิกซ้ำ = unselect (ถ้าคุณอยากให้เป็น radio ห้ามยกเลิก ก็ลบบรรทัดนี้)
    this.bookingForm.patchValue({ [controlName]: current === code ? null : code });
  }

  isBundleSelected(direction: TripDirection, code: BundleCode): boolean {
    const controlName = direction === 'OUTBOUND' ? 'outboundBundle' : 'inboundBundle';
    return (this.bookingForm.get(controlName)?.value as BundleCode | null) === code;
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
    if (!this.isPassengerUnlocked(passengerNumber)) return;

    this.saveCurrentPassenger();
    this.currentPassenger = passengerNumber;
    this.loadPassenger(passengerNumber);
  }

  isPassengerCompleted(passengerNumber: number): boolean {
    return this.completedPassengers[passengerNumber - 1];
  }

  isPassengerUnlocked(passengerNumber: number): boolean {
    if (passengerNumber === 1) return true;
    return this.completedPassengers[passengerNumber - 2];
  }

  onOpenConfirmDialog(dialog: HlmDialog): void {
    this.submitted = true;
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.saveCurrentPassenger();
    if (!this.canConfirm) return;

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

        outboundBundle: null,
        inboundBundle: null,

        specialAssistEnabled: false,
        specialAssist: {
          visualImpairment: false,
          hearingImpairment: false,
          monk: false,
          nun: false,
          pregnant: false,
          wheelchair: false,
          unaccompaniedMinor: false,
          other: false,
        },
        specialAssistOther: null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  get specialAssistEnabled(): boolean {
    return !!this.bookingForm.get('specialAssistEnabled')?.value;
  }

  get otherAssistChecked(): boolean {
    return !!this.bookingForm.get('specialAssist.other')?.value;
  }
}
