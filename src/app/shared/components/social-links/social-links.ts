import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SocialLink } from '../../models';
import { AppIcon, IconName } from '../../ui/icon/app-icon';

/**
 * Renders a horizontal list of social links (data-driven).
 * All external links open in a new tab with secure rel attributes.
 */
@Component({
  selector: 'app-social-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppIcon],
  template: `
    @if (links().length) {
      <ul class="social" aria-label="Social links">
        @for (link of links(); track link.platform) {
          <li>
            <a
              class="social__link"
              [href]="link.url"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="link.label"
            >
              <app-icon [name]="iconFor(link.icon)" [size]="size()" />
            </a>
          </li>
        }
      </ul>
    }
  `,
  styles: `
    .social {
      display: flex;
      gap: var(--spacing-md);
      list-style: none;
    }

    .social__link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.75rem;
      height: 2.75rem;
      color: var(--color-text);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-full);
      transition:
        border-color var(--transition-fast),
        color var(--transition-fast);
    }

    .social__link:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }
  `,
})
export class SocialLinks {
  readonly links = input.required<readonly SocialLink[]>();
  readonly size = input(20);

  protected iconFor(icon: string): IconName {
    if (
      icon === 'github' ||
      icon === 'linkedin' ||
      icon === 'leetcode' ||
      icon === 'mail' ||
      icon === 'phone'
    ) {
      return icon;
    }
    return 'external';
  }
}
