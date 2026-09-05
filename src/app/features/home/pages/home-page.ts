import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio-service';
import { DocumentButton } from '../../../shared/components/document-button/document-button';
import { SocialLinks } from '../../../shared/components/social-links/social-links';
import { ImgFallback } from '../../../shared/directives/img-fallback';

/**
 * Home page: profile hero, introduction, social links, and resume actions.
 * All content comes from PortfolioService signals — nothing is hardcoded.
 */
@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SocialLinks, DocumentButton, ImgFallback],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly portfolio = inject(PortfolioService);

  protected readonly profile = this.portfolio.profile;
  protected readonly social = this.portfolio.social;
  protected readonly resume = this.portfolio.resume;
  protected readonly isLoading = this.portfolio.isLoading;
  protected readonly hasError = this.portfolio.hasError;
}
