# Migration Plan (LineOAClient vNext)

> Source of truth: `public/ref-old-version/BOTNOI-LIFF` (read-only)

## 1) Page / Shared / Service Mapping

| Legacy area | Legacy path | Proposed vNext location | Notes |
| --- | --- | --- | --- |
| PDPA page | `src/app/page/pdpa-page` | `src/app/features/pdpa` | Migrated as standalone page with Tailwind UI. |
| Passenger form | `src/app/page/passenger-form` | `src/app/features/booking/form` | Pending; use new form system + Tailwind. |
| Flight seat | `src/app/page/flight-seat` | `src/app/features/booking/seat` | Pending; consider routing under `/booking`. |
| Review page | `src/app/page/review-page` | `src/app/features/booking/review` | Pending. |
| Confirm pay | `src/app/page/confirm-pay` | `src/app/features/booking/payment-confirm` | Pending. |
| Payment status | `src/app/page/payment-status-success` | `src/app/features/booking/payment-status` | Pending. |
| Shared header | `src/app/shared/header` | `src/app/shared/layout/header` | Convert to Tailwind component. |
| Shared dialog | `src/app/shared/dialog` | `src/app/shared/ui/dialog` | Replace with CDK overlay + Tailwind. |
| Shared loading | `src/app/shared/loading` | `src/app/shared/ui/loading` | Replace with skeleton utilities. |
| Shared alert error | `src/app/shared/alert-error` | `src/app/shared/ui/alert` | Convert to Tailwind alert variants. |
| API service | `src/app/core/services/api.service.ts` | `src/app/core/services/api` | Replace base URL handling, remove legacy deps. |
| Pass data service | `src/app/core/services/pass-data.service.ts` | `src/app/core/services/session` | Use signal-based state or RxJS store. |
| I18n service | `src/app/core/services/i18n/*` | `src/app/core/services/i18n` | Rebuild with Angular i18n or simple JSON loader. |
| Auth/token interceptors | `src/app/core/interceptors/*` | `src/app/core/interceptors` | Rebuild with standalone providers. |

## 2) Code Smell / Legacy Dependency Risks

- `@angular/material` usage (must be removed and replaced with Tailwind utilities).
- `moment` usage for date/time formatting (must be replaced with `Intl.DateTimeFormat`).
- `libphonenumber-js` usage for phone formatting (replace with regex or backend formatting).
- `html2canvas` usage for screenshot/export (replace with server-side PDF or canvas-free flow).
- `@ngx-translate` patterns that rely on dynamic HTTP loaders can be heavy; consider Angular i18n or a small JSON loader.
- Feature modules + routing modules (Angular 20 allows standalone components and functional providers).

## 3) Replacement Strategy (Clean + Modern)

- **Styling/UI**: Use Tailwind CSS + custom components; prefer Spartan UI patterns where applicable.
- **Date/Time**: Use `Intl.DateTimeFormat` or `Date` utilities with a single formatting helper.
- **Phone**: Use a lightweight formatter (regex) or backend-provided formatting rules.
- **State**: Use Angular signals for form steps, user session, and PDPA consent.
- **Routing**: Split into `/web` and `/liff` shells; redirect based on environment detection.
- **Services**: Provide API clients via `provideHttpClient`, isolate base URLs in one config module.

## 4) Recommended Migration Order

1. **Core shell + routing**: `/web` + `/liff` layouts, redirect logic, shared layout tokens.
2. **PDPA page**: migrate and validate standalone PDPA flow (done).
3. **Passenger form**: build form UI, validation, and data store.
4. **Seat selection**: port seat map logic and API integration.
5. **Review & payment**: migrate review, confirm payment, and status pages.
6. **Shared UI**: rebuild dialogs, loading states, alerts, and header.
7. **API layer**: refactor interceptors, token handling, and error mapping.
