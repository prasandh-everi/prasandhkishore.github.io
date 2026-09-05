import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md';

/**
 * Design-system button.
 *
 * Renders a real <button> (host is the control) so it is keyboard- and
 * screen-reader-accessible for free. For navigation/links, use an <a> styled
 * with the same tokens instead of forcing a button to behave like a link.
 */
@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="classes()"
      [attr.aria-busy]="loading() ? 'true' : null"
    >
      <ng-content />
    </button>
  `,
  styleUrl: './app-button.scss',
})
export class AppButton {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly block = input(false);

  protected readonly classes = computed(() => {
    const parts = ['btn', `btn--${this.variant()}`, `btn--${this.size()}`];
    if (this.block()) {
      parts.push('btn--block');
    }
    return parts.join(' ');
  });
}
