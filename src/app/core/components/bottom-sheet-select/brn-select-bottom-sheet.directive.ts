import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[brnSelectBottomSheetTrigger]',
  standalone: true,
})
export class BrnSelectBottomSheetTriggerDirective {
  @Input({ required: true }) openBottomSheet!: () => void;
  @Input() disabled = false;

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    if (this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this.openBottomSheet?.();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (this.disabled) return;

    const keys = ['Enter', ' ', 'ArrowDown'];
    if (!keys.includes(e.key)) return;

    e.preventDefault();
    e.stopPropagation();
    this.openBottomSheet?.();
  }
}
