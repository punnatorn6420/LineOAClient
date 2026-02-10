import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-pdpa-content',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <h1 class="text-xl font-extrabold leading-tight text-foreground md:text-2xl">
      {{ 'PDPA_TITLE' | translate }}
    </h1>

    <p class="mt-4">{{ 'PDPA_INTRO' | translate }}</p>

    <h2 class="mt-6 text-lg font-bold">{{ 'PDPA_PERSONAL_DATA_TITLE' | translate }}</h2>
    <p>{{ 'PDPA_PERSONAL_DATA_DEF' | translate }}</p>
    <p>{{ 'PDPA_SENSITIVE_DATA_DEF' | translate }}</p>

    <h2 class="mt-6 text-lg font-bold">{{ 'PDPA_COLLECTION_TITLE' | translate }}</h2>
    <p>{{ 'PDPA_COLLECTION_INTRO' | translate }}</p>
    <ul class="list-disc space-y-1 pl-6">
      <li>{{ 'PDPA_COLLECTION_LIST_1' | translate }}</li>
      <li>{{ 'PDPA_COLLECTION_LIST_2' | translate }}</li>
      <li>{{ 'PDPA_COLLECTION_LIST_3' | translate }}</li>
      <li>{{ 'PDPA_COLLECTION_LIST_4' | translate }}</li>
      <li>{{ 'PDPA_COLLECTION_LIST_5' | translate }}</li>
      <li>{{ 'PDPA_COLLECTION_LIST_6' | translate }}</li>
      <li>{{ 'PDPA_COLLECTION_LIST_7' | translate }}</li>
      <li>{{ 'PDPA_COLLECTION_LIST_8' | translate }}</li>
    </ul>

    <p class="mt-4">{{ 'PDPA_CONSENT_INTRO' | translate }}</p>
    <ul class="list-disc space-y-1 pl-6">
      <li>{{ 'PDPA_CONSENT_LIST_1' | translate }}</li>
      <li>{{ 'PDPA_CONSENT_LIST_2' | translate }}</li>
      <li>{{ 'PDPA_CONSENT_LIST_3' | translate }}</li>
      <li>{{ 'PDPA_CONSENT_LIST_4' | translate }}</li>
      <li>{{ 'PDPA_CONSENT_LIST_5' | translate }}</li>
      <li>{{ 'PDPA_CONSENT_LIST_6' | translate }}</li>
    </ul>

    <h2 class="mt-6 text-lg font-bold">{{ 'PDPA_SENSITIVE_TITLE' | translate }}</h2>
    <p>{{ 'PDPA_SENSITIVE_CONTENT' | translate }}</p>
    <ul class="list-disc space-y-1 pl-6">
      <li>{{ 'PDPA_SENSITIVE_LIST_1' | translate }}</li>
      <li>{{ 'PDPA_SENSITIVE_LIST_2' | translate }}</li>
      <li>{{ 'PDPA_SENSITIVE_LIST_3' | translate }}</li>
      <li>{{ 'PDPA_SENSITIVE_LIST_4' | translate }}</li>
      <li>{{ 'PDPA_SENSITIVE_LIST_5' | translate }}</li>
    </ul>

    <h2 class="mt-6 text-lg font-bold">{{ 'PDPA_SOURCE_TITLE' | translate }}</h2>
    <ul class="list-disc space-y-1 pl-6">
      <li>{{ 'PDPA_SOURCE_LIST_1' | translate }}</li>
      <li>{{ 'PDPA_SOURCE_LIST_2' | translate }}</li>
      <li>{{ 'PDPA_SOURCE_LIST_3' | translate }}</li>
      <li>{{ 'PDPA_SOURCE_LIST_4' | translate }}</li>
    </ul>

    <h2 class="mt-6 text-lg font-bold">{{ 'PDPA_PURPOSES_TITLE' | translate }}</h2>
    <p>{{ 'PDPA_PURPOSES_INTRO' | translate }}</p>
    <ul class="list-disc space-y-1 pl-6">
      <li>{{ 'PDPA_PURPOSES_LIST_1' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_2' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_3' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_4' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_5' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_6' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_7' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_8' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_9' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_10' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_11' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_12' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_13' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_14' | translate }}</li>
      <li>{{ 'PDPA_PURPOSES_LIST_15' | translate }}</li>
    </ul>

    <h2 class="mt-6 text-lg font-bold">{{ 'PDPA_TRANSFER_TITLE' | translate }}</h2>
    <p>{{ 'PDPA_TRANSFER_INTRO' | translate }}</p>
    <ul class="list-disc space-y-1 pl-6">
      <li>{{ 'PDPA_TRANSFER_LIST_1' | translate }}</li>
      <li>{{ 'PDPA_TRANSFER_LIST_2' | translate }}</li>
      <li>{{ 'PDPA_TRANSFER_LIST_3' | translate }}</li>
    </ul>

    <h2 class="mt-6 text-lg font-bold">{{ 'PDPA_INTERNATIONAL_TITLE' | translate }}</h2>
    <p>{{ 'PDPA_INTERNATIONAL_INTRO' | translate }}</p>
    <ul class="list-disc space-y-1 pl-6">
      <li>{{ 'PDPA_INTERNATIONAL_LIST_1' | translate }}</li>
      <li>{{ 'PDPA_INTERNATIONAL_LIST_2' | translate }}</li>
      <li>{{ 'PDPA_INTERNATIONAL_LIST_3' | translate }}</li>
      <li>{{ 'PDPA_INTERNATIONAL_LIST_4' | translate }}</li>
      <li>{{ 'PDPA_INTERNATIONAL_LIST_5' | translate }}</li>
      <li>{{ 'PDPA_INTERNATIONAL_LIST_6' | translate }}</li>
      <li>{{ 'PDPA_INTERNATIONAL_LIST_7' | translate }}</li>
      <li>{{ 'PDPA_INTERNATIONAL_LIST_8' | translate }}</li>
      <li>{{ 'PDPA_INTERNATIONAL_LIST_9' | translate }}</li>
    </ul>

    <h2 class="mt-6 text-lg font-bold">{{ 'PDPA_PROTECTION_TITLE' | translate }}</h2>
    <p>{{ 'PDPA_PROTECTION_CONTENT' | translate }}</p>

    <h2 class="mt-6 text-lg font-bold">{{ 'PDPA_RETENTION_TITLE' | translate }}</h2>
    <p>{{ 'PDPA_RETENTION_CONTENT' | translate }}</p>

    <h2 class="mt-6 text-lg font-bold">{{ 'PDPA_CHANGES_TITLE' | translate }}</h2>
    <p>{{ 'PDPA_CHANGES_CONTENT' | translate }}</p>

    <h2 class="mt-6 text-lg font-bold">{{ 'PDPA_RIGHTS_TITLE' | translate }}</h2>
    <p>{{ 'PDPA_RIGHTS_INTRO' | translate }}</p>
    <ul class="list-disc space-y-1 pl-6">
      <li>{{ 'PDPA_RIGHTS_LIST_1' | translate }}</li>
      <li>{{ 'PDPA_RIGHTS_LIST_2' | translate }}</li>
      <li>{{ 'PDPA_RIGHTS_LIST_3' | translate }}</li>
      <li>{{ 'PDPA_RIGHTS_LIST_4' | translate }}</li>
      <li>{{ 'PDPA_RIGHTS_LIST_5' | translate }}</li>
      <li>{{ 'PDPA_RIGHTS_LIST_6' | translate }}</li>
      <li>{{ 'PDPA_RIGHTS_LIST_7' | translate }}</li>
    </ul>

    <p class="mt-4">{{ 'PDPA_RIGHT_FOOTER' | translate }}</p>

    <h2 class="mt-6 text-lg font-bold">{{ 'PDPA_CONTACT_TITLE' | translate }}</h2>
    <p>{{ 'PDPA_CONTACT_COMPANY' | translate }}</p>
    <p>{{ 'PDPA_CONTACT_ADDRESS' | translate }}</p>
    <p>{{ 'PDPA_CONTACT_DISTRICT' | translate }}</p>
    <p>{{ 'PDPA_CONTACT_PHONE_TH' | translate }}</p>
    <p>{{ 'PDPA_CONTACT_PHONE_INT' | translate }}</p>
    <p>{{ 'PDPA_CONTACT_EMAIL' | translate }}</p>

    <p class="mt-4">{{ 'PDPA_CONTACT_REQUIRED' | translate }}</p>
    <ul class="list-disc space-y-1 pl-6">
      <li>{{ 'PDPA_CONTACT_REQUIRED_LIST_1' | translate }}</li>
      <li>{{ 'PDPA_CONTACT_REQUIRED_LIST_2' | translate }}</li>
      <li>{{ 'PDPA_CONTACT_REQUIRED_LIST_3' | translate }}</li>
    </ul>

    <p class="mt-6 font-semibold">{{ 'PDPA_ANNOUNCEMENT_DATE' | translate }}</p>
  `,
  host: {
    class: 'block space-y-3 text-sm leading-6 text-foreground md:text-base md:leading-7',
  },
})
export class PdpaContentComponent {}
