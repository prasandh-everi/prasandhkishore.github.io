import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

/**
 * Manages the light/dark/system theme.
 *
 * Design notes:
 * - The *preference* ('light' | 'dark' | 'system') is what the user picks and
 *   what we persist. The *resolved* theme ('light' | 'dark') is what we actually
 *   apply, resolving 'system' against `prefers-color-scheme`.
 * - SSR-safe: all browser APIs (localStorage, matchMedia, document) are guarded
 *   with `isPlatformBrowser`. On the server we fall back to 'light'.
 * - Mirrors the synchronous anti-flash script in index.html so the runtime and
 *   the pre-paint bootstrap never disagree.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _preference = signal<ThemePreference>(this.readStoredPreference());

  /** The user's chosen preference. */
  readonly preference = this._preference.asReadonly();

  /** The concrete theme currently applied to the document. */
  readonly resolved = computed<ResolvedTheme>(() => this.resolve(this._preference()));

  constructor() {
    // Apply the resolved theme to <html data-theme> whenever it changes.
    effect(() => {
      const theme = this.resolved();
      if (this.isBrowser) {
        this.document.documentElement.setAttribute('data-theme', theme);
      }
    });

    // React to OS theme changes while the user is on 'system'.
    if (this.isBrowser) {
      const media = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)');
      media?.addEventListener('change', () => {
        if (this._preference() === 'system') {
          // Touch the signal to force re-resolution via the effect.
          this._preference.set('system');
        }
      });
    }
  }

  /** Set and persist a specific preference. */
  setPreference(preference: ThemePreference): void {
    this._preference.set(preference);
    if (this.isBrowser) {
      try {
        this.document.defaultView?.localStorage.setItem(STORAGE_KEY, preference);
      } catch {
        // Storage may be unavailable (private mode); ignore.
      }
    }
  }

  /** Convenience toggle between light and dark (drops 'system'). */
  toggle(): void {
    this.setPreference(this.resolved() === 'dark' ? 'light' : 'dark');
  }

  private readStoredPreference(): ThemePreference {
    if (!this.isBrowser) {
      return 'system';
    }
    try {
      const stored = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch {
      // ignore
    }
    return 'system';
  }

  private resolve(preference: ThemePreference): ResolvedTheme {
    if (preference !== 'system') {
      return preference;
    }
    if (!this.isBrowser) {
      return 'light';
    }
    const prefersDark = this.document.defaultView?.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    return prefersDark ? 'dark' : 'light';
  }
}
