import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../../../core/services/portfolio-service';
import { AppSection } from '../../../shared/ui/section/app-section';
import { AppBadge } from '../../../shared/ui/badge/app-badge';

/** About page: biography and skills grouped by category. */
@Component({
  selector: 'app-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppSection, AppBadge],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
})
export class AboutPage {
  private readonly portfolio = inject(PortfolioService);
  protected readonly profile = this.portfolio.profile;
  protected readonly skills = this.portfolio.skills;
}
