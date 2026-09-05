import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio-service';
import { AppIcon, IconName } from '../../shared/ui/icon/app-icon';

/**
 * Site footer: social links (data-driven) and copyright.
 * External links use rel="noopener noreferrer" for security.
 */
@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly portfolio = inject(PortfolioService);

  protected readonly social = this.portfolio.social;
  protected readonly name = this.portfolio.profile;
  protected readonly year = new Date().getFullYear();

  /** Map a social platform to a known icon; falls back to 'external'. */
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
