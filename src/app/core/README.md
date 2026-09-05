# Core

Application-wide, single-instance concerns (provided at root):

- `config/` — application configuration & injection tokens
- `services/` — cross-cutting services (PortfolioService, ThemeService, SeoService)
- `data/` — data-access layer (PortfolioRepository — the JSON-vs-API swap point)
- `interceptors/` — HTTP interceptors (error handling)
- `guards/` — route guards
- `error-handling/` — global error handler

Import core things once. Never import a feature into core.
