import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Experience } from '../../../../shared/models';
import { AppBadge } from '../../../../shared/ui/badge/app-badge';
import { DateRangePipe } from '../../../../shared/pipes/date-range-pipe';

/**
 * Reusable, responsive experience timeline.
 *
 * Uses a semantic ordered list. On mobile it is a single-column timeline with a
 * left rail; on wider screens the rail and content align. Optional lists
 * (achievements) only render when present.
 */
@Component({
  selector: 'app-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppBadge, DateRangePipe],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline {
  readonly items = input.required<readonly Experience[]>();
}
