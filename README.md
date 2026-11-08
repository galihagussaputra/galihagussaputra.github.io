# Galih.dev - Portfolio & Notes

A bilingual personal portfolio and notes site for **Galih Agus Saputra**, built with **Astro**, **MDX**, and a custom editorial design system. English is served at the root, Indonesian is served under `/id/`, and the whole site is deployed as static files to **GitHub Pages**.

Live site: <https://galihagussaputra.github.io>

## Features

- **English-first bilingual site** with Indonesian under `/id/` and page-aware language switching
- **Editorial portfolio** with a homepage, profile, selected work, notes, and contact page
- **Project case studies** with role, status, technology, problem, contribution, and challenge sections
- **Notes and articles** with reading time, table of contents, related posts, and MDX content
- **Dark and light themes** with system preference detection, `localStorage` persistence, and no theme flash
- **Responsive navigation** with an accessible mobile menu
- **Motion with restraint**, including scroll reveals that respect `prefers-reduced-motion`
- **SEO built in**: canonical URLs, `hreflang`, Open Graph, Twitter cards, JSON-LD, sitemap alternates, RSS, and `robots.txt`
- **Static output** with no client-side translation and no runtime framework

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | [Astro](https://astro.build/) 5 |
| Content | Astro Content Collections + [MDX](https://mdxjs.com/) |
| Language | TypeScript |
| Styling | Vanilla CSS with custom properties |
| Display type | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) |
| Body type | [Inter](https://fonts.google.com/specimen/Inter) |
| Metadata type | [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |
| Icons | [Font Awesome 6](https://fontawesome.com/) via CDN |
| Feed | `@astrojs/rss` |
| Sitemap | `@astrojs/sitemap` |
| Deployment | GitHub Pages via GitHub Actions |

## Requirements

- Node.js 20 or newer
- npm

## Quick Start

```bash
git clone https://github.com/galihagussaputra/galihagussaputra.github.io.git
cd galihagussaputra.github.io
npm install
npm run dev
```

The development server runs at <http://localhost:4321>.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Astro development server with hot reload |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro` | Run Astro CLI commands |

## Project Structure

```text
.
├── .github/workflows/deploy.yml
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── MobileNav.astro
│   │   ├── Seo.astro
│   │   ├── ThemeScript.astro
│   │   └── ThemeToggle.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── about/
│   │   │   ├── profile.mdx
│   │   │   └── profile-en.mdx
│   │   ├── skills/
│   │   ├── projects/
│   │   └── posts/
│   ├── data/
│   │   └── site.ts
│   ├── i18n/
│   │   ├── content.ts
│   │   ├── ui.ts
│   │   └── utils.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── projects.astro
│   │   ├── projects/[...slug].astro
│   │   ├── blog/index.astro
│   │   ├── blog/[...slug].astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   ├── rss.xml.ts
│   │   └── id/
│   ├── styles/
│   │   └── global.css
│   └── views/
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Routing and Localization

English is the default locale and is served without a prefix. Indonesian is served under `/id/`.

| Page | English | Indonesian |
| --- | --- | --- |
| Home | `/` | `/id/` |
| About | `/about/` | `/id/about/` |
| Projects | `/projects/` | `/id/projects/` |
| Project detail | `/projects/<routeSlug>/` | `/id/projects/<routeSlug>/` |
| Notes | `/blog/` | `/id/blog/` |
| Note detail | `/blog/<routeSlug>/` | `/id/blog/<routeSlug>/` |
| Contact | `/contact/` | `/id/contact/` |
| RSS | `/rss.xml` | `/id/rss.xml` |

The site uses Astro's native `i18n` configuration with `prefixDefaultLocale: false`. Every page is pre-rendered for its locale; browser translation is not used.

The i18n layer lives in `src/i18n/`:

- `ui.ts` contains UI strings and the `useTranslations(lang)` helper.
- `utils.ts` contains locale detection, path localization, alternate path generation, and locale-aware date formatting.
- `content.ts` contains localized collection queries, translation lookup, slug helpers, skill localization, and reading-time calculation.

The language switcher is path-aware. Index pages map to their locale-prefixed equivalent. Detail pages look up the counterpart entry by `translationKey`, so translated projects and notes can use different URL slugs while still linking correctly.

## Content Model

All localizable entries declare a language and a translation key:

```yaml
lang: 'en' # or 'id'
translationKey: 'unique-key-shared-by-translations'
routeSlug: 'public-url-segment' # optional; defaults to the file slug
```

`translationKey` is used to pair translations. `routeSlug` controls the public URL segment for project and note detail pages.

Skills are a single collection. English labels are optional fields on the Indonesian entry:

```yaml
title_en: 'Cloud & Deployment'
description_en: 'AWS, Vercel, GitHub Pages. Automated deployment with CI/CD.'
```

If an English skill label is missing, the Indonesian label is used as a fallback.

### Profile

Edit `src/content/about/profile.mdx` for Indonesian and `src/content/about/profile-en.mdx` for English. Both must use `translationKey: 'profile'`.

```mdx
---
name: 'Galih Agus Saputra'
role: 'Software Developer'
experienceYears: 3
bio: 'Short biography.'
heroTagline: 'Hello, I am Galih Agus Saputra'
heroSubtitle: 'Software Developer focused on modern web applications.'
lang: 'en'
translationKey: 'profile'
---
```

The MDX body is rendered on the About page.

### Projects

Add project files to `src/content/projects/`. Keep one file per language.

```mdx
---
title: 'Project Name'
description: 'Short project summary.'
icon: 'fa-solid fa-laptop-code'
tags: ['Astro', 'TypeScript', 'PostgreSQL']
liveUrl: 'https://example.com'
githubUrl: 'https://github.com/user/repo'
featured: true
status: 'completed' # in-progress | completed | planned
order: 1
pubDate: 2026-01-01
problem: 'Problem the project solves.'
contribution: 'What you designed and built.'
challenges: 'Key constraints or trade-offs.'
image: '/images/project-name.png' # optional, file in public/
lang: 'en'
translationKey: 'project-name'
routeSlug: 'project-name'
---
```

The page view renders the project title, metadata, and case-study fields. The MDX body is for the longer write-up.

Project links currently use placeholder URLs such as `https://example.com`. Replace them with real project and repository links before publishing.

### Notes

Add articles to `src/content/posts/`. Use the same `translationKey` for a translated pair.

```mdx
---
title: 'Article Title'
description: 'Short article summary.'
pubDate: 2026-01-01
updatedDate: 2026-02-01 # optional
tags: ['Astro', 'Web']
draft: false
image: '/images/article-cover.png' # optional
lang: 'en'
translationKey: 'article-key'
routeSlug: 'article-key'
---
```

Draft articles are excluded from the notes index and feeds. Reading time is calculated automatically.

### Skills

Add or edit files in `src/content/skills/`.

```mdx
---
title: 'React'
description: 'Indonesian description.'
category: 'Frontend'
icon: 'fa-brands fa-react'
order: 2
color: '#61dafb'
title_en: 'React'
description_en: 'English description.'
---
```

### Adding a Translation

1. Create the counterpart file with the same `translationKey`.
2. Set `lang` to the target locale.
3. Keep or change `routeSlug` as needed; the detail-page language switcher resolves the counterpart automatically.
4. Add `title_en` and `description_en` for skills when English labels differ.
5. Run `npm run build` and check both URLs and the language switcher.

Do not begin an MDX body with an `#` heading. Page views render the entry title as the single `<h1>`.

## Theme and Design System

Design tokens are defined in `src/styles/global.css`.

- Light theme is the default token set on `:root`.
- Dark theme overrides tokens on `[data-theme='dark']`.
- `ThemeScript.astro` runs inline in the document head, adds the `has-js` class, and applies the stored or system-preferred theme before paint.
- `ThemeToggle.astro` switches `data-theme` and persists the choice in `localStorage`.
- Typography, spacing, measure, and motion tokens are shared across components via CSS custom properties.
- Scroll reveals use `IntersectionObserver` and are disabled when `prefers-reduced-motion: reduce` is active.

Site-wide identity and social links live in `src/data/site.ts`.

## SEO and Feeds

`Seo.astro` renders:

- page title and description
- canonical URL
- `hreflang` alternates for English, Indonesian, and `x-default`
- Open Graph and Twitter metadata
- article timestamps and tags when available
- light and dark `theme-color` values
- JSON-LD structured data supplied by page views

The sitemap is configured with locale alternates in `astro.config.mjs`. Per-language RSS feeds are generated at `/rss.xml` and `/id/rss.xml`. `public/robots.txt` points crawlers to the sitemap index. The 404 page is marked `noindex`.

## Deployment

The site is configured for GitHub Pages through `.github/workflows/deploy.yml`.

On every push to `main`, the workflow:

1. Checks out the repository.
2. Sets up Node.js 20 with npm caching.
3. Runs `npm ci`.
4. Runs `npm run build`.
5. Uploads `dist/` as the Pages artifact.
6. Deploys the artifact with GitHub Pages.

In the repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**. Do not use the legacy Jekyll source; if the deployment log mentions Jekyll, change the Pages source to GitHub Actions.

`site` in `astro.config.mjs` must match the public production URL. `base` is `/` because the site is served from the repository's GitHub Pages root.

### Deploying Elsewhere

The build is fully static. For Vercel or Netlify, use:

- Build command: `npm run build`
- Publish directory: `dist`

If you deploy elsewhere, update `site` in `astro.config.mjs` so canonical URLs, sitemap entries, and feeds use the correct domain.

## Local Verification

```bash
npm run build
npm run preview
```

Check both locales for the main routes:

```text
/
/id/
/about/
/id/about/
/projects/
/id/projects/
/blog/
/id/blog/
/contact/
/id/contact/
/rss.xml
/id/rss.xml
```

Also verify a project detail page, a note detail page, the language switcher, theme persistence after reload, the mobile menu, and the 404 page.

## License

MIT
