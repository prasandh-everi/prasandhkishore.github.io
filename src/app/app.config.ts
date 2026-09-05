import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { PortfolioRepository } from './core/data/portfolio-repository';
import { JsonPortfolioRepository } from './core/data/json-portfolio-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      // Restore scroll position on back/forward and scroll to #anchors.
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
      // Bind route params (e.g. :id) directly to component input()s.
      withComponentInputBinding(),
    ),
    // `withFetch` uses the Fetch API — required for HttpClient during SSR.
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    // Bind the data-access abstraction to the JSON implementation.
    // This single line is the "swap point" to a future REST API repository.
    { provide: PortfolioRepository, useClass: JsonPortfolioRepository },
  ],
};
