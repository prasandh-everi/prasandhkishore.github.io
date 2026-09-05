import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { PortfolioData } from '../../shared/models';
import { PORTFOLIO_DATA_URL } from '../tokens/portfolio-data-url.token';
import { PortfolioRepository } from './portfolio-repository';

/**
 * JSON-backed implementation of {@link PortfolioRepository}.
 *
 * `shareReplay(1)` caches the single successful emission so the file is fetched
 * once and shared by all subscribers (no duplicate network calls). Error
 * handling is intentionally left to the consuming service so it can present a
 * user-friendly fallback UI.
 */
@Injectable()
export class JsonPortfolioRepository extends PortfolioRepository {
  private readonly http = inject(HttpClient);
  private readonly url = inject(PORTFOLIO_DATA_URL);

  private readonly data$ = this.http
    .get<PortfolioData>(this.url)
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));

  load(): Observable<PortfolioData> {
    return this.data$;
  }
}
