import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { FormControl } from '@angular/forms';

export interface BottomSheetOption<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-bottom-sheet-select-sheet',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './bottom-sheet-select-sheet.component.html',
})
export class BottomSheetSelectSheetComponent implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() selected = new EventEmitter<BottomSheetOption<any>>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('sheetTpl') sheetTpl!: TemplateRef<any>;

  private overlayRef: OverlayRef | null = null;

  title = 'Select';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: BottomSheetOption<any>[] = [];
  private control: FormControl | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentValue: any = null;

  constructor(
    private overlay: Overlay,
    private vcr: ViewContainerRef,
  ) {}

  ngOnDestroy(): void {
    this.detach();
  }

  openFor<T>(
    control: FormControl<T | null>,
    options: BottomSheetOption<T>[] | string[],
    title?: string,
  ) {
    this.control = control as unknown as FormControl;
    this.currentValue = control.value; // ✅ เอาไว้โชว์ selected state
    this.title = title ?? 'Select';

    this.options =
      Array.isArray(options) && typeof options[0] === 'string'
        ? (options as string[]).map((s) => ({ label: s, value: s }))
        : (options as BottomSheetOption<T>[]);

    if (!this.overlayRef) {
      const positionStrategy = this.overlay.position().global().left('0').right('0').bottom('0');

      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'fixed inset-0 bg-black/40',
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy,
        panelClass: 'fixed inset-0 z-[9999] pointer-events-none',
      });

      this.overlayRef.backdropClick().subscribe(() => this.close());
      this.overlayRef.keydownEvents().subscribe((e) => {
        if (e.key === 'Escape') this.close();
      });
    }

    const portal = new TemplatePortal(this.sheetTpl, this.vcr);
    this.overlayRef.attach(portal);
  }

  close() {
    this.detach();
  }

  private detach() {
    if (this.overlayRef?.hasAttached()) this.overlayRef.detach();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  choose(opt: BottomSheetOption<any>) {
    if (this.control) {
      this.control.setValue(opt.value);
      this.control.markAsDirty();
      this.control.markAsTouched();
      this.control.updateValueAndValidity();
    }
    this.currentValue = opt.value; // ✅ sync
    this.selected.emit(opt);
    this.close();
  }
}
