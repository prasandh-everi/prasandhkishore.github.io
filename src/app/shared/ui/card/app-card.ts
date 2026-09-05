import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Surface container with border, radius and optional hover elevation.
 * Content is projected; keeps card styling in one place (no magic numbers).
 */
@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" [class.card--interactive]="interactive()">
      <ng-content />
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .card {
      height: 100%;
      background: var(--color-surface-raised);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .card--interactive {
      transition:
        border-color var(--transition-base),
        box-shadow var(--transition-base),
        transform var(--transition-base);
    }

    .card--interactive:hover {
      border-color: var(--color-primary);
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
  `,
})
export class AppCard {
  readonly interactive = input(false);
}
