import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { PortfolioData } from './shared/models';

/**
 * Prerender parameters for the parameterized project detail route.
 * Reads project ids from the bundled portfolio.json so every /projects/:id page
 * is statically generated (SSG) for SEO and fast first paint.
 */
async function getProjectIds(): Promise<{ id: string }[]> {
  // Read from the stable source assets folder (present during build), with a
  // dist fallback. Reading source avoids timing issues with the browser output.
  const candidates = [
    join(process.cwd(), 'public/assets/data/portfolio.json'),
    join(process.cwd(), 'dist/portfolio-web/browser/assets/data/portfolio.json'),
  ];
  for (const file of candidates) {
    try {
      const raw = await readFile(file, 'utf-8');
      const data = JSON.parse(raw) as PortfolioData;
      return data.projects.map((p) => ({ id: p.id }));
    } catch {
      // try next candidate
    }
  }
  return [];
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'projects/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getProjectIds,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
