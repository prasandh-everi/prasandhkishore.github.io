import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';
import {
  Experience,
  PortfolioData,
  PortfolioDocument,
  Profile,
  Project,
  SkillGroup,
  SocialLink,
} from '../../shared/models';
import { PortfolioRepository } from '../data/portfolio-repository';

/** Coarse loading state for the portfolio data. */
export type PortfolioStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Application facade over portfolio content.
 *
 * Responsibilities:
 * - Trigger the load through the repository (RxJS at the async edge).
 * - Expose state as signals for templates (loading / error / data).
 * - Provide derived selectors (`computed`) so components read exactly what they
 *   need without knowing the shape of the whole document.
 *
 * Why signals here (not a BehaviorSubject): the data is synchronous, read-only
 * UI state after it loads. Signals give fine-grained, zoneless-friendly updates
 * and simpler templates. RxJS stays at the HTTP boundary where it belongs.
 */
@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly repository = inject(PortfolioRepository);

  private readonly _data = signal<PortfolioData | null>(null);
  private readonly _status = signal<PortfolioStatus>('idle');

  /** Full portfolio document (null until loaded). */
  readonly data = this._data.asReadonly();
  readonly status = this._status.asReadonly();

  readonly isLoading = computed(() => this._status() === 'loading');
  readonly hasError = computed(() => this._status() === 'error');

  // Derived selectors — safe defaults while data is null.
  readonly profile = computed<Profile | null>(() => this._data()?.profile ?? null);
  readonly social = computed<readonly SocialLink[]>(() => this._data()?.social ?? []);
  readonly documents = computed<readonly PortfolioDocument[]>(() => this._data()?.documents ?? []);
  readonly skills = computed<readonly SkillGroup[]>(() => this._data()?.skills ?? []);

  /** Experience sorted most-recent-first (null endDate = "Present" = newest). */
  readonly experience = computed<readonly Experience[]>(() => {
    const items = this._data()?.experience ?? [];
    return [...items].sort((a, b) => this.sortKey(b) - this.sortKey(a));
  });

  readonly projects = computed<readonly Project[]>(() => this._data()?.projects ?? []);

  /** Convenience: the resume document, if configured. */
  readonly resume = computed<PortfolioDocument | null>(
    () => this._data()?.documents.find((d) => d.type === 'resume') ?? null,
  );

  /**
   * Load the portfolio once. Idempotent: repeated calls after success are no-ops
   * because the repository caches (`shareReplay`) and status short-circuits.
   */
  load(): void {
    if (this._status() === 'loading' || this._status() === 'success') {
      return;
    }
    this._status.set('loading');
    this.repository
      .load()
      .pipe(
        tap((data) => {
          this._data.set(data);
          this._status.set('success');
        }),
        catchError(() => {
          this._status.set('error');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  /** Look up a single project by id (used by the detail route). */
  projectById(id: string): Project | undefined {
    return this._data()?.projects.find((p) => p.id === id);
  }

  private sortKey(exp: Experience): number {
    // Present (null endDate) sorts newest; otherwise use start date.
    if (exp.endDate === null) {
      return Number.MAX_SAFE_INTEGER;
    }
    return new Date(exp.startDate).getTime();
  }
}
