import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio-service';
import { AppBadge } from '../../../shared/ui/badge/app-badge';
import { ImgFallback } from '../../../shared/directives/img-fallback';
import { ImageGallery } from '../components/image-gallery/image-gallery';

/**
 * Project detail page (routed at /projects/:id).
 *
 * We chose a route (not a modal) so each project is deep-linkable, shareable,
 * independently prerenderable, and SEO-friendly. The `id` route param is bound
 * directly via `withComponentInputBinding`-style input() (Angular's component
 * input binding), and the project is resolved from the loaded portfolio data.
 *
 * Optional sections (screenshots, architecture, challenges, links) only render
 * when their data is present.
 */
@Component({
  selector: 'app-project-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AppBadge, ImgFallback, ImageGallery],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.scss',
})
export class ProjectDetailPage {
  private readonly portfolio = inject(PortfolioService);

  /** Bound from the :id route parameter (component input binding). */
  readonly id = input.required<string>();

  protected readonly project = computed(() => this.portfolio.projectById(this.id()));
  protected readonly screenshots = computed(() => this.project()?.screenshots ?? []);
  protected readonly showLinks = computed(() => {
    const p = this.project();
    return !!p && !p.confidential && (!!p.githubUrl || !!p.liveUrl);
  });
}
