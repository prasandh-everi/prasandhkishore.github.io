import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../../../core/services/portfolio-service';
import { AppSection } from '../../../shared/ui/section/app-section';
import { Timeline } from '../components/timeline/timeline';

/** Experience page: a chronological, responsive timeline. */
@Component({
  selector: 'app-experience-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppSection, Timeline],
  template: `
    <app-section sectionId="experience" eyebrow="Career" heading="Experience">
      @if (experience().length) {
        <app-timeline [items]="experience()" />
      } @else {
        <p>No experience to display yet.</p>
      }
    </app-section>
  `,
})
export class ExperiencePage {
  private readonly portfolio = inject(PortfolioService);
  protected readonly experience = this.portfolio.experience;
}
