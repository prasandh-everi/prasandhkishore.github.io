import { Routes } from '@angular/router';

/**
 * Route table.
 * Every feature is lazy-loaded via `loadComponent` so each ships as its own
 * bundle and is only fetched when the user navigates to it (code-splitting).
 * Route data carries the page title (applied automatically by the router).
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Portfolio',
    // Single scrollable page composing every section (home, experience,
    // projects, about, contact). Header nav scrolls to #fragment anchors.
    loadComponent: () => import('./features/home/pages/landing-page').then((m) => m.LandingPage),
  },
  {
    path: 'projects/:id',
    title: 'Project — Portfolio',
    // Kept as a real route for deep-linkable, prerendered project details.
    loadComponent: () =>
      import('./features/projects/pages/project-detail-page').then((m) => m.ProjectDetailPage),
  },
  { path: '**', redirectTo: '' },
];
