import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomePage } from './home-page';
import { ExperiencePage } from '../../experience/pages/experience-page';
import { ProjectsPage } from '../../projects/pages/projects-page';
import { AboutPage } from '../../about/pages/about-page';
import { ContactPage } from '../../contact/pages/contact-page';

/**
 * Single-page (scrollable) landing view.
 *
 * Instead of routing between separate pages, every feature section is stacked
 * vertically so the whole portfolio reads as one continuous, scrollable page.
 * Header navigation scrolls to each section via URL fragments (anchorScrolling
 * is enabled in app.config). The `projects/:id` detail route still exists as a
 * real route for deep-linkable, prerendered project pages.
 */
@Component({
  selector: 'app-landing-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HomePage, ExperiencePage, ProjectsPage, AboutPage, ContactPage],
  template: `
    <app-home-page />
    <app-projects-page />
    <app-experience-page />
    <app-about-page />
    <app-contact-page />
  `,
})
export class LandingPage {}
