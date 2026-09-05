import { InjectionToken } from '@angular/core';

/**
 * URL of the portfolio data source.
 *
 * Injected (rather than hardcoded) so the location can vary by environment and
 * be overridden in tests. When we later move to a REST API, only this token's
 * value and the repository implementation change — components stay untouched.
 */
export const PORTFOLIO_DATA_URL = new InjectionToken<string>('PORTFOLIO_DATA_URL', {
  providedIn: 'root',
  factory: () => 'assets/data/portfolio.json',
});
