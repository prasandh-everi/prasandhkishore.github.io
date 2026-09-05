import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio-service';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

interface NavItem {
  readonly label: string;
  /** Section anchor id on the single-page landing view. */
  readonly fragment: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', fragment: 'home' },
  { label: 'Work', fragment: 'projects' },
  { label: 'Experience', fragment: 'experience' },
  { label: 'About', fragment: 'about' },
  { label: 'Contact', fragment: 'contact' },
];

/**
 * Sticky application header: brand, primary navigation, theme toggle, and a
 * mobile menu. The site is a single scrollable page, so navigation uses URL
 * fragments to smooth-scroll to each section (anchorScrolling is enabled in
 * app.config).
 *
 * A lightweight scrollspy highlights the section currently being read. It uses
 * a marker near the top third of the viewport, so the active state changes at
 * a predictable point even when sections have very different heights.
 */
@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private readonly portfolio = inject(PortfolioService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly navItems = NAV_ITEMS;
  protected readonly name = this.portfolio.profile;
  protected readonly menuOpen = signal(false);
  /** Fragment id of the section currently in view (drives active highlight). */
  protected readonly activeSection = signal<string>('home');

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.observeSections();
  }

  private observeSections(): void {
    let animationFrame: number | null = null;

    const updateActiveSection = (): void => {
      animationFrame = null;

      // The landing page is lazy-loaded after the header. Resolve the sections
      // on every update so the scrollspy also survives route changes.
      const sections = this.navItems
        .map((item) => document.getElementById(item.fragment))
        .filter((el): el is HTMLElement => el !== null);

      if (!sections.length || window.scrollY <= 1) {
        this.activeSection.set('home');
        return;
      }

      // Change the active item when a section reaches roughly the top third of
      // the viewport. Capping the marker keeps the behavior natural on tall
      // desktop screens.
      const marker = Math.min(window.innerHeight * 0.35, 260);
      let active = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) {
          active = section;
        } else {
          break;
        }
      }

      // The final section may be shorter than the viewport and never reach the
      // marker. At the bottom of the page, always highlight the final nav item.
      const pageBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (pageBottom >= documentHeight - 2) {
        active = sections[sections.length - 1];
      }

      this.activeSection.set(active.id);
    };

    const scheduleUpdate = (): void => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    // Content and route components render asynchronously. Recalculate when the
    // main content tree changes so the tracker starts as soon as sections exist.
    const contentRoot = document.querySelector('main') ?? document.body;
    const contentObserver = new MutationObserver(scheduleUpdate);
    contentObserver.observe(contentRoot, { childList: true, subtree: true });

    scheduleUpdate();

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      contentObserver.disconnect();
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
