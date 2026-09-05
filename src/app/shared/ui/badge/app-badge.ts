import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Small pill label used for technologies/tags.
 * Purely presentational — content is projected.
 */
@Component({
  selector: 'app-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="badge"><ng-content /></span>`,
  styles: `
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 2px var(--spacing-sm);
      font-size: var(--font-size-xs);
      font-family: var(--font-mono);
      color: var(--color-muted);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-full);
      white-space: nowrap;
    }
  `,
})
export class AppBadge {}
