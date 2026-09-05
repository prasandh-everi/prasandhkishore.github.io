# Portfolio — Senior Software Engineer

A production-quality, data-driven Angular portfolio application. Content is loaded
from a JSON contract behind a service abstraction, so the data source can later be
swapped for a REST API without UI changes.

> This project is built incrementally in phases. This README grows with each phase.

## Tech Stack

- **Angular 20** — standalone components, signals, new control flow (`@if`/`@for`/`@switch`), `@defer`
- **TypeScript** (strict) — strong typing, no `any`
- **SCSS + CSS custom properties** — design tokens, light/dark theming (no CSS framework)
- **Angular SSR / prerender (SSG)** — SEO + fast first paint for static content
- **ESLint + Prettier** — linting and consistent formatting
- **Jasmine + Karma** — unit/component tests

Backend (Phase 9): a thin **ASP.NET Core** Web API for the contact form.

## Project Structure

```
src/
├── app/
│   ├── core/        # single-instance app concerns (services, data, config, guards)
│   ├── shared/      # reusable UI components, pipes, directives, models, utils
│   ├── layout/      # header, nav, footer (Phase 3)
│   ├── features/    # home, experience, projects, about, contact (lazy-loaded)
│   ├── app.ts       # root shell
│   ├── app.routes.ts
│   └── app.config.ts
├── styles/          # design system: _tokens, _reset, _mixins, _animations
├── styles.scss      # global entry point
└── index.html       # includes anti-flash theme bootstrap
public/
└── assets/          # data (portfolio.json), images, documents
```

### Architectural principles

- **Data-driven**: components never hardcode content; they consume a typed
  `PortfolioData` object via a service (JSON now, REST API later).
- **Feature-oriented**: each feature owns its `pages/` and `components/`, and is
  lazy-loaded via `loadComponent` for code-splitting.
- **Signals-first state**: signals for template state; RxJS at async edges (HTTP).
- **Design tokens**: all colors/spacing/radius live as CSS variables — no magic numbers.

## Local Development

Prerequisites: Node.js (v22.22.3+ or v24.15.0+ recommended) and npm.

```bash
cd portfolio-web
npm install
npm start            # dev server at http://localhost:4200
```

## Scripts

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `npm start`            | Run the dev server             |
| `npm run build`        | Production build               |
| `npm test`             | Run unit/component tests       |
| `npm run lint`         | Run ESLint                     |
| `npm run format`       | Format sources with Prettier   |
| `npm run format:check` | Verify formatting (CI)         |

## Theming

Light / dark / system preference. The choice is persisted in `localStorage`
(`portfolio-theme`) and applied via a small synchronous script in `index.html`
before first paint to avoid a flash of the wrong theme. The runtime `ThemeService`
(Phase 3) keeps this in sync.

## Roadmap (phases)

0. Architecture ✅ · 1. Project setup ✅ · 2. Data architecture · 3. Layout & theme ·
4. Home · 5. Experience · 6. Projects · 7. About · 8. Contact ·
9. Backend API · 10. Quality (tests/a11y/SEO/perf) · 11. Production & CI/CD
