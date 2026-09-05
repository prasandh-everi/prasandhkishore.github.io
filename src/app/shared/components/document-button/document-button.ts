import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PortfolioDocument } from '../../models';
import { AppIcon } from '../../ui/icon/app-icon';

export type DocumentAction = 'view' | 'download';

/**
 * Renders a link that either views (new tab) or downloads a configured document.
 *
 * The file path comes from the {@link PortfolioDocument} (config-driven), never
 * hardcoded. "View" opens in a new tab with secure rel attributes and lets the
 * browser's native PDF viewer render it; "Download" uses the `download`
 * attribute. The action is only shown if the document permits it
 * (`viewable` / `downloadable`).
 */
@Component({
  selector: 'app-document-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppIcon],
  template: `
    @if (enabled()) {
      <a
        class="doc-btn"
        [class.doc-btn--secondary]="action() === 'download'"
        [href]="document().file"
        [attr.target]="action() === 'view' ? '_blank' : null"
        [attr.rel]="action() === 'view' ? 'noopener noreferrer' : null"
        [attr.download]="action() === 'download' ? '' : null"
      >
        <app-icon [name]="action() === 'view' ? 'external' : 'download'" [size]="18" />
        <span>{{ label() }}</span>
      </a>
    }
  `,
  styleUrl: './document-button.scss',
})
export class DocumentButton {
  readonly document = input.required<PortfolioDocument>();
  readonly action = input.required<DocumentAction>();

  protected readonly enabled = computed(() =>
    this.action() === 'view' ? this.document().viewable : this.document().downloadable,
  );

  protected readonly label = computed(() => {
    const title = this.document().title;
    return this.action() === 'view' ? `View ${title}` : `Download ${title}`;
  });
}
