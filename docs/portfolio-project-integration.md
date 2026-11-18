# Portfolio project integration log

Working document for adding MovieStream, ERP Construction Services, and E-Commerce Platform to the Astro portfolio.

## Phase 1 — Initial inspection

### Website repository

- Path: `/mnt/d/Projek/Github/galihagussaputra.github.io`
- Remote: `https://github.com/galihagussaputra/galihagussaputra.github.io.git`
- Framework: Astro 5.11, static output, MDX content collections, `@astrojs/sitemap`, GitHub Pages site URL `https://galihagussaputra.github.io`, base `/`.
- Git status at start: clean (no uncommitted changes).
- Projects data lives in `src/content/projects/*.mdx`, one file per locale, paired with `translationKey` and `routeSlug`.
- Content schema: `src/content/config.ts`; localized queries: `src/i18n/content.ts`; UI strings: `src/i18n/ui.ts`.
- Listing view: `src/views/ProjectsPage.astro`; detail view: `src/views/ProjectDetailPage.astro`.
- Routes already generate both locales from `src/pages/projects/[...slug].astro` and `src/pages/id/projects/[...slug].astro`.
- Existing asset convention: only root-level files in `public/`; no project image directory exists yet. New screenshots will use `public/images/projects/<project>/`.
- Existing three projects (dashboard, e-commerce, task-app) have no screenshots in the content collection and use placeholder URLs; their data will be preserved unchanged.

### Source repositories

| Project | Local path | Remote | Status |
| --- | --- | --- | --- |
| MovieStream | `/mnt/d/Projek/Github/MovieStream` | `https://github.com/galihagussaputra/MovieStream.git` | Available, clean |
| ERP Construction Services | `/mnt/d/Projek/Github/erp-contruction-services` | `https://github.com/galihagussaputra/erp-contruction-services.git` | Available, clean |

No live demo URLs were found in either README; only repository links will be published.

## Phase 2 — Project research

### MovieStream (verified from README, composer.json, package.json, routes and source tree)

- Purpose: movie and TV show catalog with public browsing, realtime TMDB Explore pages, and an admin panel for local content management.
- Stack: PHP 8.1+, Laravel 10, Vue 3, Inertia.js, Tailwind CSS 3, Vite 4, MySQL 8, Laravel Jetstream/Sanctum, Spatie Permission/Searchable, Docker Compose.
- Implemented features: catalog browsing with search/pagination/sorting, movie/TV detail pages, seasons/episodes/cast/genres/tags, admin CRUD with `admin` role middleware, TMDB metadata import into local database, realtime Explore pages backed by TMDB, TMDB response caching, trailer/download link management, cascading deletes, server-side validation, responsive UI.
- Verified modifications/improvements (git history): added a centralized TMDB service with v4 bearer token (v3 key fallback) and cache TTL, added realtime Explore catalog/search/detail pages, added TV show support, validated admin writes and constrained nested index queries, fixed Vite HMR host for browser/WSL, removed a committed TMDB key, added Docker environment and bilingual README.
- Status: implemented/modified application; no hosted demo found. Screenshots refreshed in November 2026.
- Screenshots: `docs/screenshots/{home,movies,movie-detail,tv-shows,tv-show-detail,admin-movies,admin-attach}.png` (1440px wide).
- Safety: selected public catalog/detail screenshots only; admin and login captures are excluded so no account data is shown.

### ERP Construction Services (verified from README, docs/architecture.md, routes and source tree)

- Purpose: construction-company ERP covering the commercial and operational flow from customer and quotation through project execution, purchasing, inventory, attendance, expenses, invoicing, and reporting.
- Stack: PHP 8.1 / Laravel 8.83, MySQL 8, Nginx, Blade server-rendered views, vanilla CSS/JS, Laravel Mix 6 with pinned Webpack, DOM PDF, PHPUnit, Docker Compose.
- Implemented modules: dashboard, customers, projects with timeline/status/team/budget, quotations with approval and PDF, invoices with partial payments and PDF, purchase orders with receiving, inventory and stock movements, employees and attendance, expenses with approval, five management reports.
- Architecture: Laravel monolith; Nginx → PHP-FPM → controllers/form requests/services/Eloquent/MySQL; Form Requests own validation and authorization; `approve` gate for manager/admin; `DocumentNumberService` for sequential numbers in transactions; `StockService` as single writer for stock quantities with project cost attribution and reversal.
- Verified modifications/improvements (git history): completed domain logic and demo seed data, built a custom responsive interface, added stock ledger and rendering/invoice-total tests, documented architecture, dockerized stack with reproducible assets, added performance indexes.
- Status: implemented application with seeded demo data; no hosted demo found.
- Screenshots: desktop captures in `docs/screenshots/desktop/` (1920px) and mobile captures in `docs/screenshots/mobile/` (390px @2x).
- Safety: selected list/report screens generated from the synthetic demo seeder (fictional `*.test` accounts and `example.test` contacts). Login, customer-detail, employee-detail, and receipt views are excluded.

### Technical decisions

- Add only structured frontmatter fields and optional screenshot arrays; keep MDX bodies for long-form localized write-ups.
- Reuse `Seo.astro` metadata path and existing detail-page routing; no new translation mechanism or runtime dependency.
- Add real screenshots as optimized WebP files generated from the source PNGs with the already-installed `sharp` library; retain original aspect ratios and descriptive names.
- Project cards will show image previews when a project has a screenshot; existing screenshot-less entries keep their original text presentation.

### Verification

See Phase 4 below.

## Phase 3 — Implementation

### Files added

- `src/content/projects/moviestream-en.mdx`, `src/content/projects/moviestream.mdx`
- `src/content/projects/erp-construction-services-en.mdx`, `src/content/projects/erp-construction-services.mdx`
- `public/images/projects/moviestream/*.webp` (4 files)
- `public/images/projects/erp-construction-services/*.webp` (6 files)
- This progress log

### Files modified

- `src/content/config.ts` — added localized `category`, `period`, feature/implementation/improvement fields, image metadata, and a screenshot object with `wide` support.
- `src/i18n/ui.ts` — added EN/ID labels for the new sections and metadata; clarified the problem heading.
- `src/views/ProjectsPage.astro` — lead and row cards now render real screenshots when present, with category labels, correct image dimensions, lazy loading, and mobile stacking.
- `src/views/ProjectDetailPage.astro` — added period/category facts, features, implementation, improvements, screenshot gallery, accessible image metadata, and repository-only `sameAs` JSON-LD.
- `README.md` — documented the new asset convention, screenshot fields, real repository links, and the new verification routes.

### Screenshots selected

MovieStream (public pages only):

- `moviestream-catalog.webp` — card and main figure, from `docs/screenshots/movies.png`, 1200×928.
- `moviestream-movie-detail.webp` — from `movie-detail.png`, 960×789.
- `moviestream-tv-shows.webp` — from `tv-shows.png`, 960×743.
- `moviestream-home.webp` — from `home.png`, 720×1089, marked wide in the gallery.

ERP Construction Services (seeded demo data only):

- `erp-projects.webp` — card and main figure, 1200×675.
- `erp-project-detail.webp`, `erp-quotations.webp`, `erp-invoices.webp`, `erp-inventory.webp`, `erp-financial-report.webp` — gallery, 960px wide.

Login, admin-only, customer-detail, employee-detail, and receipt captures were intentionally excluded. Original PNGs were resized with the existing `sharp` installation and encoded as WebP; total output is about 328 KB.

### Technical decisions

- New projects use `order: -2` and `order: -1` so they lead the editorial list without changing the original three entries' `order`, `featured`, links, or text.
- No live demo links are published because none were found in the source repositories.
- The language switcher continues to resolve counterparts through `translationKey`; both projects use identical `routeSlug` values in EN and ID.
- No new runtime dependency was added; `sharp` was only used to prepare static assets during development.

## Phase 4 — Quality assurance

- `npm run build`: passed, 25 static pages generated, including both new detail routes in English and Indonesian.
- Route/image smoke test against the built `dist/` output: 13 checked URLs returned HTTP 200 (home, both project indexes, both new detail pages in both locales, three original detail pages, two sample WebP assets, sitemap index).
- Local reference check: 33 internal `href`/`src` values extracted from the new and modified project pages; none were missing from `dist/`.
- Metadata check: both new detail pages have unique titles, descriptions, canonical URLs, EN/ID `hreflang` alternates, `og:image`, and repository `sameAs` JSON-LD in both locales.
- Bilingual check: EN and ID headings, descriptions, feature lists, and captions are present in the generated HTML; language switcher links point to the paired routes.
- Layout check: card and gallery CSS uses explicit width/height attributes, `max-width: 100%`, two-column galleries collapsing to one column at 600px, and single-column lead/rows at 760px. No browser-based visual regression run was available in this environment.
- Typecheck/lint: the repository defines no typecheck, lint, or format scripts; only the Astro production build was available.
- Git diff review: no source code, `.env` files, database dumps, or original repository files were copied into the portfolio.

## Phase 5 — Documentation and limitations

- README updated for the new project entries and verification routes.
- This log records sources, decisions, screenshots, and verification results.

### Limitations

- No hosted demos exist in the source repositories, so only repository links are shown.
- Screenshots could not be visually rendered in this environment; selection was based on screenshot filenames, source documentation, capture scripts, and the synthetic demo seeder. Captures showing login forms, admin account data, customer contacts, employee records, and receipts were excluded to reduce exposure risk.
- The original three project entries still contain their pre-existing placeholder links and in-progress status; they were left unchanged as requested.
- Responsive behaviour was validated through CSS review and built-output checks, not through a headless browser at 1920/1366/768/390px.

## Phase 6 — E-Commerce Platform integration (2026-11-18)

### Source verification

- Portfolio remote: `https://github.com/galihagussaputra/galihagussaputra.github.io.git`, branch `main`.
- E-Commerce remote: `https://github.com/galihagussaputra/e-commerce-platform.git`, branch `main`, clean working tree.
- Repository `created_at` from the GitHub API: `2025-12-01T09:41:36Z`. This date, not the first commit date, is used as `pubDate` in both locales.
- Source docs reviewed: `README.md`, `docs/architecture.md`, `docs/implementation-log.md`, `docs/admin-visual-qa.md`, both package manifests, routes, services, and the screenshot inventory.

### Content changes

- Replaced the placeholder E-Commerce entries in `src/content/projects/e-commerce.mdx` and `e-commerce-en.mdx` with verified stack, repository URL, category, period, case-study fields, features, technical decisions, and localized MDX write-ups.
- Removed the `https://example.com` live URL because the source repository has no hosted demo; checkout needs Stripe test keys and webhook forwarding.
- Kept `translationKey: 'e-commerce'` and `routeSlug: 'e-commerce'` so the existing routes and language switcher continue to pair the locales.
- Set `status: 'completed'` and `pubDate: 2025-12-01`.

### Screenshots

Copied nine source captures from `docs/screenshots/` and `docs/screenshots/admin/` into `public/images/projects/e-commerce-platform/` as WebP, resized to 1200px wide with the existing `sharp` installation. Source PNG files were left untouched.

- Public: `ecommerce-home.webp`, `ecommerce-catalog.webp`, `ecommerce-product.webp`, `ecommerce-cart.webp`.
- Admin: `ecommerce-admin-dashboard.webp`, `ecommerce-admin-products.webp`, `ecommerce-admin-inventory.webp`, `ecommerce-admin-orders.webp`, `ecommerce-admin-analytics.webp`.
- Admin captures were requested explicitly and come from the synthetic seed data documented in `docs/admin-visual-qa.md`; no credentials or tokens are shown.

### Verification

- `npm run build`: passed.
- Built HTML checked for both `/projects/e-commerce/` and `/id/projects/e-commerce/`, including the `1 Dec 2025` / `1 Des 2025` dates, repository link, and localized screenshot captions.
- All referenced WebP assets exist in `dist/` and return valid dimensions.
- Portfolio `git status` and E-Commerce `git status` checked after implementation.
- No commit or push was performed.
