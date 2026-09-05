import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * A page section with a consistent container, vertical rhythm, an anchor id
 * (for in-page navigation), and an optional heading/eyebrow.
 *
 * Using a semantic <section> with an <h2> keeps the heading hierarchy correct
 * across the site (the page-level <h1> lives in the hero).
 */
@Component({
  selector: 'app-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [id]="sectionId()" class="section">
      <div class="container" [class.container--narrow]="narrow()">
        @if (heading()) {
          <header class="section__head">
            @if (eyebrow()) {
              <p class="section__eyebrow">{{ eyebrow() }}</p>
            }
            <h2 class="section__title">{{ heading() }}</h2>
          </header>
        }
        <ng-content />
      </div>
    </section>
  `,
  styles: `
    .section {
      padding-block: var(--spacing-3xl);
    }

    .section__head {
      margin-bottom: var(--spacing-xl);
    }

    .section__eyebrow {
      margin-bottom: var(--spacing-xs);
      font-family: var(--font-mono);
      font-size: var(--font-size-sm);
      color: var(--color-primary);
    }

    .section__title {
      font-size: var(--font-size-2xl);
    }
  `,
})
export class AppSection {
  readonly sectionId = input<string>();
  readonly heading = input<string>();
  readonly eyebrow = input<string>();
  readonly narrow = input(false);
}
