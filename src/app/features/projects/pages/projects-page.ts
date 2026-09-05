import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../../../core/services/portfolio-service';
import { AppSection } from '../../../shared/ui/section/app-section';
import { ProjectCard } from '../components/project-card/project-card';

/** Projects list page: a responsive grid of project cards. */
@Component({
  selector: 'app-projects-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppSection, ProjectCard],
  template: `
    <app-section sectionId="projects" eyebrow="Selected work" heading="Engineering case studies">
      <p class="projects-intro">
        Sanitized examples from professional work. They focus on the engineering problems,
        decisions, and contributions I can discuss without exposing proprietary details.
      </p>
      @if (projects().length) {
        <ul class="projects-grid">
          @for (project of projects(); track project.id) {
            <li><app-project-card [project]="project" /></li>
          }
        </ul>
      } @else {
        <p>No projects to display yet.</p>
      }
    </app-section>
  `,
  styles: `
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
      gap: var(--spacing-lg);
      padding: 0;
      list-style: none;
    }

    .projects-intro {
      max-width: 65ch;
      margin-top: calc(-1 * var(--spacing-md));
      margin-bottom: var(--spacing-xl);
      color: var(--color-muted);
    }
  `,
})
export class ProjectsPage {
  private readonly portfolio = inject(PortfolioService);
  protected readonly projects = this.portfolio.projects;
}
