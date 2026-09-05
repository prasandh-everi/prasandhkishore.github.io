import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../shared/models';
import { AppBadge } from '../../../../shared/ui/badge/app-badge';
import { AppCard } from '../../../../shared/ui/card/app-card';
import { ImgFallback } from '../../../../shared/directives/img-fallback';

/**
 * Presentational project card.
 *
 * Shows a thumbnail (if available), title, short description, a few
 * technologies, and a "View details" link to the detail route. Handles the
 * "no thumbnail" case gracefully. Stateless — data comes via input().
 */
@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AppCard, AppBadge, ImgFallback],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
